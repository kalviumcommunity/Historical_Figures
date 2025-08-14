import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import stringSimilarity from "string-similarity";
import { createZeroShotPrompt } from "./zeroShot.js";
import { createOneShotPrompt } from "./oneShot.js";
import { createMultiShotPrompt } from "./multiShot.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const historyPath = path.resolve("history.txt");

function loadHistoryData() {
  try {
    if (!fs.existsSync(historyPath)) {
      fs.writeFileSync(historyPath, "");
    }
    return fs.readFileSync(historyPath, "utf-8");
  } catch (err) {
    console.error("Error reading history.txt:", err.message);
    return "";
  }
}

function appendToHistory(data) {
  try {
    fs.appendFileSync(historyPath, `\n${data}`);
  } catch (err) {
    console.error("Failed to append to history.txt:", err.message);
  }
}

// --- Top-K similarity search ---
function getTopKMatches(query, k = 3) {
  const ragData = loadHistoryData();
  const lines = ragData.split("\n").filter((line) => line.trim());

  const matches = lines.map((line) => ({
    text: line,
    score: stringSimilarity.compareTwoStrings(query.toLowerCase(), line.toLowerCase())
  }));

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((m) => m.text);
}

// --- Functions exposed to the model ---
const availableFunctions = {
  getPersonInfo: (name, k = 3) => {
    const topMatches = getTopKMatches(name, k);
    return topMatches.length
      ? topMatches
      : [`No information found for ${name}.`];
  },
  listAllFigures: () => {
    const ragData = loadHistoryData();
    return ragData
      .split("\n")
      .filter((line) => line.trim() && line.includes(":"))
      .map((line) => line.split(":")[0].trim());
  },
  clearHistory: () => {
    try {
      fs.writeFileSync(historyPath, "");
      return "History cleared.";
    } catch (err) {
      return "Failed to clear history: " + err.message;
    }
  },
};

app.post("/ask", async (req, res) => {
  const { prompt, question, mode, temperature, role, context } = req.body;

  const ragData = loadHistoryData();

  const dynamicSystemPrompt = role
    ? `You are a ${role}. Answer questions accurately, concisely, and in simple language. ${
        context ? "Context: " + context : ""
      }\nExtra RAG Data:\n${ragData}`
    : `You are a knowledgeable historian. Answer questions accurately, concisely, and in simple language.\nExtra RAG Data:\n${ragData}`;

  let finalPrompt;
  if (prompt) finalPrompt = prompt;
  else if (question) {
    if (mode === "one") finalPrompt = createOneShotPrompt(question);
    else if (mode === "multi") finalPrompt = createMultiShotPrompt(question);
    else finalPrompt = createZeroShotPrompt(question);
  } else {
    return res.status(400).json({ error: "Please provide either 'prompt' or 'question'." });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: dynamicSystemPrompt },
        { role: "user", content: finalPrompt },
      ],
      temperature: temperature ?? 0.2,
      max_tokens: 500,
      functions: [
        {
          name: "getPersonInfo",
          description: "Get biography of a historical figure (Top-K matches)",
          parameters: {
            type: "object",
            properties: {
              name: { type: "string" },
              k: { type: "number", description: "Number of top matches to return" }
            },
            required: ["name"]
          },
        },
        {
          name: "listAllFigures",
          description: "List all historical figures in RAG data",
          parameters: { type: "object", properties: {} },
        },
        {
          name: "clearHistory",
          description: "Clear RAG history",
          parameters: { type: "object", properties: {} },
        },
      ],
      function_call: "auto",
    });

    const choice = completion.choices[0];

    if (choice.message.function_call) {
      const fnName = choice.message.function_call.name;
      const fnArgs = choice.message.function_call.arguments
        ? JSON.parse(choice.message.function_call.arguments)
        : {};

      if (availableFunctions[fnName]) {
        const result = availableFunctions[fnName](...Object.values(fnArgs));
        appendToHistory(`Function call: ${fnName} with args ${JSON.stringify(fnArgs)} => ${JSON.stringify(result)}`);
        return res.json({ answer: result, source: "function_call" });
      } else {
        return res.status(400).json({ error: `Unknown function ${fnName}` });
      }
    }

    res.json({ answer: choice.message.content, source: "model" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

console.log("Using history.txt at:", historyPath);
console.log("History exists?", fs.existsSync(historyPath));
console.log("History content:\n", loadHistoryData());

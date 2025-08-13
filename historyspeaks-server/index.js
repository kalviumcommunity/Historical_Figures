import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { createZeroShotPrompt } from "./zeroShot.js";
import { createOneShotPrompt } from "./oneShot.js";
import { createMultiShotPrompt } from "./multiShot.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Path to history.txt
const historyPath = path.join(process.cwd(), "history.txt");

// Helper to load RAG context from file
function loadHistoryData() {
  try {
    return fs.readFileSync(historyPath, "utf-8");
  } catch (err) {
    console.warn("history.txt not found or unreadable.");
    return "";
  }
}

app.post("/ask", async (req, res) => {
  const { prompt, question, mode, temperature, role, context } = req.body;

  // Load RAG history content
  const ragData = loadHistoryData();

  // Default role & context if not provided
  const dynamicSystemPrompt = role
    ? `You are a ${role}. Answer questions accurately, concisely, and in simple language. ${context ? "Context: " + context : ""}\nExtra RAG Data:\n${ragData}`
    : `You are a knowledgeable historian. Answer questions accurately, concisely, and in simple language.\nExtra RAG Data:\n${ragData}`;

  let finalPrompt;
  if (prompt) {
    finalPrompt = prompt;
  } else if (question) {
    if (mode === "one") {
      finalPrompt = createOneShotPrompt(question);
    } else if (mode === "multi") {
      finalPrompt = createMultiShotPrompt(question);
    } else {
      finalPrompt = createZeroShotPrompt(question);
    }
  } else {
    return res.status(400).json({ error: "Please provide either 'prompt' or 'question'." });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: dynamicSystemPrompt
        },
        {
          role: "user",
          content: finalPrompt
        }
      ],
      temperature: temperature ?? 0.2,
      max_tokens: 500,
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

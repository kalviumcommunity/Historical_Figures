import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";


dotenv.config();
const app = express();
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful historian. Always return a JSON object with the format: { 'answer': string, 'year': number, 'source': string }",
          },
          { role: "user", content: question },
        ],
        temperature: 0,
      }),
    });

    const data = await response.json();

    // Parse JSON from AI's response
    let aiText = data.choices[0].message.content;
    let parsed;
    try {
      parsed = JSON.parse(aiText);
    } catch (err) {
      parsed = { answer: aiText, year: null, source: null };
    }

    res.json(parsed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

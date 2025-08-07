🕰️ HistorySpeaks
HistorySpeaks is a Generative AI project where users can chat with famous historical figures like Albert Einstein, Mahatma Gandhi, Cleopatra

This project combines cutting-edge AI techniques including:

Prompting

RAG (Retrieval-Augmented Generation)

Function Calling

Structured Output

💡 Ideal for students learning about Generative AI concepts in a fun and interactive way!

✨ Features
💬 Chat with historical figures

🔍 Get real facts using RAG

🧠 Ask intelligent questions and get smart replies

🛠️ Function calling for special tasks like fetching dates, timelines, or biographies

📦 Structured output to keep responses clean and organized

🔧 Tech Stack
Backend: Node.js + Express

Frontend: React (optional)

AI Integration: OpenAI (GPT-4 or GPT-3.5)

RAG: Uses a knowledge base or vector store like Pinecone/FAISS

Function Calling: OpenAI Tools API

Structured Output: JSON schema for clean results

🧠 Key Concepts Used
1. 🗣️ Prompting
Custom prompts are used to make the AI speak like a specific person from history.

Example:

js

const prompt = `
You are Albert Einstein. Speak like him and respond only in that character.
Never say you're an AI. Mention your theory of relativity if asked about physics.
`;
2. 📚 RAG (Retrieval-Augmented Generation)
The model is connected to a knowledge base or document store to fetch real, verified information before answering.

Flow:

User asks a question

App searches the vector database

Top results are sent to the model with the prompt

The model uses both prompt + facts to respond

3. ⚙️ Function Calling
Useful for:

Fetching timelines

Looking up birth/death dates

Showing a short bio

Example:

json

{
  "name": "getImportantDates",
  "description": "Get major dates from a person's life",
  "parameters": {
    "person": "Albert Einstein"
  }
}
4. 🧾 Structured Output
The output from the AI is formatted (usually in JSON) to keep things consistent.

Example:

json

{
  "name": "Albert Einstein",
  "born": "1879",
  "famousFor": "Theory of Relativity",
  "quote": "Imagination is more important than knowledge."
}
🚀 Getting Started
Clone the repo

Install dependencies

Add your OpenAI API key

Run the server

Start chatting with history!

📁 Folder Structure

HistorySpeaks/
├── backend/
│   ├── index.js
│   ├── routes/
│   └── functions/
├── prompts/
│   └── einstein.txt
├── rag/
│   └── vectorStore.js
├── frontend/ (optional)
│   └── React UI
└── README.md
✅ To Do
 Set up basic prompting

 Add vector search (RAG)

 Implement function calling

 Format responses using structured output

 Add more historical characters

 Add speech/text-to-speech features

🙋‍♀️ Example Questions
"Einstein, what inspired you to develop the theory of relativity?"

"Gandhiji, what are your thoughts on non-violence today?"

"Cleopatra, tell me about your rule and your love story."


# 🕰️ HistorySpeaks

**HistorySpeaks** is a Generative AI project that allows users to interact with famous personalities from history like Albert Einstein, Mahatma Gandhi, Cleopatra, and more.

---

## 🚀 Features

- 🧠 **Prompting**: The AI is prompted to behave like a historical figure using detailed instructions and character traits.
- 📚 **RAG (Retrieval-Augmented Generation)**: Uses document retrieval to provide accurate and relevant responses based on historical facts.
- ⚙️ **Function Calling**: Handles tasks like looking up important dates or structured facts (e.g., birth year, major works).
- 📊 **Structured Output**: Responses can be formatted into timelines, quotes, and fact tables for clarity.

---

## 🛠️ Tech Stack

- Node.js
- OpenAI API
- Express.js
- MongoDB (optional, for logging interactions)
- React (for frontend, if applicable)

---

## 📦 How It Works

1. The user selects a historical figure.
2. A pre-defined prompt is sent to the AI to simulate that person's tone and knowledge.
3. RAG fetches relevant documents or context if needed.
4. If a fact (e.g., birth year) is requested, the system uses function calling to retrieve it.
5. The response is formatted using structured output (markdown, JSON, etc.).

---

## 📁 Example Output

> 👤 **Albert Einstein:**  
> "Imagination is more important than knowledge. In 1905, I published the theory of special relativity. Would you like to know more?"

---

## 📎 Usage

```bash
# Install dependencies
npm install

# Start the server
node index.js

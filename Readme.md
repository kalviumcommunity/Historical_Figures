# 🗨️ HistorySpeaks

**Talk to the Legends of the Past — Powered by Generative AI**

**HistorySpeaks** lets you have AI-powered conversations with famous historical figures like **Einstein**, **Gandhi**, or **Cleopatra** using advanced techniques in Generative AI.

---

## 🌟 What’s Inside

| Feature | Description |
|--------|-------------|
| 🎭 Prompting | Makes the AI behave like a historical figure |
| 🔍 RAG | Fetches real info to improve accuracy |
| 🛠️ Function Calling | Runs special functions like "get biography" or "important events" |
| 📦 Structured Output | Responses are organized in a clean format |

---

## 🔧 Technologies Used

- **Node.js** + **Express** – Backend
- **OpenAI API** – AI model and function calling
- **React (Optional)** – Frontend UI

---

## 🧪 How It Works

### 🔹 Prompting
The model is guided using instructions like:

> "You are Mahatma Gandhi. Always reply in a peaceful tone. Mention non-violence in your answers."

---

### 🔹 RAG (Retrieval-Augmented Generation)
1. User asks: *“What was Einstein’s greatest invention?”*  
2. The system searches a knowledge base (like PDFs, Wikipedia articles)  
3. Results are combined with the prompt  
4. Model replies with relevant and factual content  

---

### 🔹 Function Calling

Used when the user needs structured info like:

- Important dates  
- Short biography  
- List of achievements  

Example:
```json
{
  "function": "getBiography",
  "arguments": {
    "name": "Albert Einstein"
  }
}
```

---

### 🔹 Structured Output

AI replies in this format:
```json
{
  "name": "Cleopatra",
  "ruled": "51–30 BC",
  "notableFacts": ["Last pharaoh of Egypt", "Alliance with Julius Caesar"],
  "famousQuote": "I will not be triumphed over."
}
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/historyspeaks
cd historyspeaks
npm install
```

1. Create `.env` and add your OpenAI API Key  
2. Run server: `node index.js`  
3. Access via Postman or frontend UI (optional)

---

## 📁 Project Structure

```
HistorySpeaks/
│
├── backend/
│   ├── index.js
│   ├── routes/
│   └── functions/
│
├── rag/
│   └── embed_and_search.js
│
├── prompts/
│   └── character_prompts/
│
├── utils/
│   └── structured_output.js
│
└── frontend/ (optional)
```

---

## 🧠 Example Questions

- “Einstein, what do you think about black holes?”  
- “Cleopatra, how did you rise to power?”  
- “Gandhi, what's your view on modern society?”

---

## ✅ Future Ideas

- Add voice-to-text and text-to-speech  
- Add chat history and favorites  
- Allow users to create their own characters  

---


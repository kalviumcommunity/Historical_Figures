# 🕰️ HistorySpeaks

**HistorySpeaks** is a Generative AI experience that lets users engage in conversations with legendary figures from the past such as Albert Einstein, Mahatma Gandhi, Cleopatra, and many more.

---

## 🚀 Key Highlights

- 🧠 **Character Prompting**: The AI is guided to imitate a historical personality using descriptive prompts and characteristic behavior.
- 📚 **RAG (Retrieval-Augmented Generation)**: Integrates document search to deliver historically accurate and context-aware answers.
- ⚙️ **Function Calling**: Enables specific lookups like birth dates, key achievements, and other structured data.
- 📊 **Structured Output**: Answers are structured clearly through timelines, famous quotes, and information tables.

---

## 🛠️ Technologies Used

- Node.js
- OpenAI API
- Express.js
- MongoDB 
- React 

---

## 📦 Workflow

1. A user chooses a historical icon.
2. A specialized prompt is sent to the AI to replicate that person's style and knowledge.
3. RAG retrieves supportive documents or contextual information when needed.
4. If factual details are requested, function calls handle fetching specific data.
5. The response is formatted neatly using structured layouts (e.g., markdown or JSON).

---

## 📁 Sample Interaction

> 👤 **Albert Einstein:**  
> "Imagination trumps knowledge. In 1905, I introduced the special theory of relativity. Would you like to dive deeper?"

---

## 📎 Getting Started

```bash
# Install all required packages
npm install

# Launch the backend server
node index.js

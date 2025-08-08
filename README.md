# 🕰️ HistorySpeaks 

**HistorySpeaks** is an AI-powered application that allows users to engage in dynamic conversations with historical figures such as **Albert Einstein**, **Mahatma Gandhi**, **Cleopatra**, and others.

--- 

## ✨ Key Features

- 🧠 **Persona Simulation**: Uses advanced prompt engineering to emulate the voice, knowledge, and personality of well-known figures from history.
- 📚 **Retrieval-Augmented Generation (RAG)**: Enhances responses with accurate, fact-based content drawn from historical resources.
- ⚙️ **Function Calling**: Dynamically fetches structured data like birth dates, key events, or famous works.
- 🧾 **Structured Outputs**: Information is clearly formatted using lists, tables, or timelines to improve readability.

--- 

## 🧰 Tech Stack

- **Node.js** – Backend runtime environment  
- **Express.js** – Server framework  
- **OpenAI API** – Powering the conversational AI  
- **MongoDB** *(optional)* – For storing and analyzing user interactions  
- **React** *(optional)* – For building a responsive frontend UI

--- 

## 🧠 How It Works

1. A user selects a historical figure to interact with.
2. A detailed prompt is sent to the AI to generate responses in the voice of that figure.
3. If additional knowledge is required, RAG retrieves relevant contextual documents.
4. When structured facts are requested, the system uses function calling to fetch data.
5. The response is returned in a neatly formatted layout (e.g., markdown or JSON).

--- 

## 💬 Example Output

> 👤 **Cleopatra:**  
> "I ruled Egypt with intelligence and diplomacy. My alliance with Julius Caesar shaped the course of Roman history. Curious to know more about my reign?"

--- 

## 🚀 Getting Started

To run the project locally:

```bash 
# Install all dependencies
npm install 

# Start the server
node index.js 

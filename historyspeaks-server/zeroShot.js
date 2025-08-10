export function createZeroShotPrompt(question) {
  return `
You are a knowledgeable historian.
Answer the user's question accurately, concisely, and in simple language.
Return your answer as plain text.

Question: ${question}
  `;
}

export function createMultiShotPrompt(question) {
  return `
You are a knowledgeable historian.


Now answer this question:
Q: ${question}
A:
  `;
}

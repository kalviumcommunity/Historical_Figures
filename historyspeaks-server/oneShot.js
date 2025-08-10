export function createOneShotPrompt(question) {
  return `
You are a knowledgeable historian.

Example:
Q: When did the American Civil War start?
A: The American Civil War started in 1861 and lasted until 1865.

Now answer this question:
Q: ${question}
A:
  `;
}

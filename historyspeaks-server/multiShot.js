export function createMultiShotPrompt(question) {
  return `
You are a knowledgeable historian.

Examples:
Q: When did the American Civil War start?
A: The American Civil War started in 1861 and lasted until 1865.

Q: Who was the first president of the United States?
A: George Washington was the first president of the United States.

Now answer this question:
Q: ${question}
A:
  `;
}

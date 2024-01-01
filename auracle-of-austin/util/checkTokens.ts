import { getNumTokens } from "./getNumTokens";

export const checkTokens = async (messages, maxTokens = 4000) => {
  let numTokens = await getNumTokens(messages);

  // Check if removal is necessary
  if (numTokens <= maxTokens) {
    return messages;
  }

  // Define max number of iterations to prevent infinite loops
  const maxIterations = messages.length - 1;

  for (let i = 0; i < maxIterations && numTokens > maxTokens; i++) {
    // Remove oldes message
    messages.shift();
    // Recalculate token count
    numTokens = await getNumTokens(messages);
  }

  return messages;
};

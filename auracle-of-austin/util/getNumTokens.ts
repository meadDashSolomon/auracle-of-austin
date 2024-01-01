import { getEncoding, encodingForModel } from "js-tiktoken";

// Count tokens
export const getNumTokens = async (messages, model = "gpt-3.5-turbo-0613") => {
  // Load encoding
  let encoding;
  try {
    encoding = encodingForModel(model);
  } catch (error) {
    console.warn(`Warning: model not found. Using cl100k_base encoding.`);
    encoding = getEncoding("cl100k_base");
  }

  let tokensPerMessage, tokensPerName;
  if (model === "gpt-3.5-turbo-0301") {
    tokensPerMessage = 4; // every message follows {role/name}\n{content}\n
    tokensPerName = -1; // if there's a name, the role is omitted
  } else if (
    [
      "gpt-3.5-turbo-0613",
      "gpt-3.5-turbo-16k-0613",
      "gpt-4-0314",
      "gpt-4-32k-0314",
      "gpt-4-0613",
      "gpt-4-32k-0613",
    ].includes(model)
  ) {
    tokensPerMessage = 3;
    tokensPerName = 1;
  } else {
    throw new Error(
      `numTokensFromMessages() is not implemented for model ${model}`
    );
  }

  let numTokens = 0;
  messages.forEach((msg) => {
    numTokens += tokensPerMessage;
    for (const [key, value] of Object.entries(msg)) {
      numTokens += encoding.encode(value.trim()).length;
      if (key === "name") {
        numTokens += tokensPerName;
      }
    }
  });

  numTokens += 3; // every reply is primed with assistant
  return numTokens;
};

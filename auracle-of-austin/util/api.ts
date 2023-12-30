const createURL = (path) => window.location.origin + path;

export const saveMessage = async (messages, conversationId) => {
  const res = await fetch(new Request(createURL("/api/saveMessages")), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages, conversationId }),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};

export const getGptResponse = async (message, conversationId) => {
  const res = await fetch(new Request(createURL("/api/gpt")), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, conversationId }),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong with the GPT API!");
  }
};

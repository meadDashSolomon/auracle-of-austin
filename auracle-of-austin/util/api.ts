const createURL = (path) => window.location.origin + path;

export const getMessages = async (conversationId) => {
  const url = createURL(`/api/getMessages?conversationId=${conversationId}`);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong with fetching messages!");
  }
};

export const formatMessages = async (message, conversationId) => {
  const res = await fetch(new Request(createURL("/api/formatMessages")), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, conversationId }),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong with the token server!");
  }
};

export const saveMessages = async (messages, conversationId) => {
  const res = await fetch(new Request(createURL("/api/saveMessages")), {
    method: "PUT",
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

export const getGptResponse = async (messages) => {
  const res = await fetch(new Request(createURL("/api/gpt")), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong with the GPT server!");
  }
};

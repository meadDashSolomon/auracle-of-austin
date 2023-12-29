const createURL = (path) => window.location.origin + path;

export const saveMessage = async (message, sender, conversationId) => {
  const res = await fetch(new Request(createURL("/api/saveMessages")), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, sender, conversationId }),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};

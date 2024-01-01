import React, { useEffect, useRef } from "react";

const MessageFeed = ({ messages }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`${
            msg.role === "user" ? "bg-blue-400" : "bg-gray-400"
          } text-white p-2 rounded-lg mb-2`}
        >
          {msg.content}
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageFeed;

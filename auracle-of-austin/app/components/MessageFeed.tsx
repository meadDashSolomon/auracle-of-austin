const MessageFeed = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`${
            msg.sender === "user" ? "bg-blue-400" : "bg-gray-400"
          } text-white p-2 rounded-lg mb-2`}
        >
          {msg.message}
        </div>
      ))}
    </div>
  );
};

export default MessageFeed;

const Chat = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* This div is for the chat messages; it should be scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Chat messages will go here */}
      </div>
      {/* This div is for the input area; it should be fixed to the bottom */}
      <div className="p-4 bg-white border-t-2 border-gray-200">
        <textarea
          className="w-full p-2 border border-gray-300 rounded resize-none"
          rows="1"
          placeholder="Type your message here..."
        />
      </div>
    </div>
  );
};

export default Chat;

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4 border-t border-gray-700">
        <h2 className="text-lg font-semibold">GPT Settings</h2>
        {/* GPT Settings Controls */}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Chat History</h2>
        {/* List of Chat Histories */}
        <div className="mt-4">{/* Map through chat history items */}</div>
      </div>
    </div>
  );
};

export default Sidebar;

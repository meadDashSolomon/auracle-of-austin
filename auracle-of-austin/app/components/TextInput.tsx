"use client";
import { useState } from "react";

const TextInput = () => {
  const [message, setMessage] = useState("");

  // Temporary handlers for buttons
  const handleFileUpload = (e) => {
    // Handle the file upload event
    console.log(e.target.files);
  };

  const handleSubmit = () => {
    // Handle the submit event
    console.log("Message submitted:", message);
    // Clear the textarea after submit
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Adjust the textarea height based on its content
  const handleInput = (e) => {
    const maxHeight = 400; // Maximum height in pixels
    e.target.style.height = "inherit"; // Reset the height to recalculate
    const scrollHeight = e.target.scrollHeight; // Get the scroll height of the content
    if (scrollHeight > maxHeight) {
      // If the scrollHeight is greater than maxHeight, set it to maxHeight and enable scrolling
      e.target.style.height = `${maxHeight}px`;
      e.target.style.overflowY = "auto"; // Enable scrolling
    } else {
      // If the content is less than maxHeight, grow the textarea
      e.target.style.height = `${scrollHeight}px`;
      e.target.style.overflowY = "hidden"; // Hide the scrollbar when not needed
    }
  };

  return (
    <div className="mt-auto">
      {/* Input area */}
      <div className="flex items-center justify-between p-2 bg-white border-t-2 border-gray-200">
        {/* File Upload Button */}
        <label className="flex items-center px-2 py-2 bg-gray-200 text-gray-800 rounded cursor-pointer hover:bg-gray-300">
          <input type="file" className="hidden" onChange={handleFileUpload} />
          <span>Upload</span>
        </label>

        {/* Text Input */}
        <textarea
          value={message}
          onChange={handleChange}
          onInput={handleInput}
          className="flex-1 p-2 mx-4 border border-gray-300 rounded resize-none overflow-hidden text-black"
          rows="1"
          placeholder="Type your message here..."
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TextInput;
"use client";
import { getGptResponse, saveMessages, getMessages } from "@/util/api";
import { checkTokens } from "@/util/checkTokens";
import { useState, useEffect } from "react";

const TextInput = ({
  conversation,
  conversationId,
  setConversationId,
  setConversation,
}) => {
  const [message, setMessage] = useState("");

  // Temporary handlers for buttons
  const handleFileUpload = (e) => {
    // Handle the file upload event
    console.log(e.target.files);
  };

  // Load conversation when the component mounts or when conversationId changes
  useEffect(() => {
    const fetchConversation = async () => {
      if (conversationId) {
        const oldMessages = await getMessages(conversationId);
        setConversation(oldMessages);
      }
    };

    fetchConversation();
  }, [conversationId]);

  const handleSubmit = async () => {
    // Edge case - no text submitted
    if (!message.trim()) {
      console.log("No message entered");
      return;
    }

    // Log to console to indicate waiting for APIs
    console.log("handleSubmit triggered");

    // API calls
    try {
      // Add new user message to the conversation array
      let updatedConversation = [
        ...conversation,
        { role: "user", content: message },
      ];

      // Get token count of messages and truncate if necessary
      updatedConversation = await checkTokens(updatedConversation);

      // Get response from Open AI's api
      const gptResponse = await getGptResponse(updatedConversation);

      // Add GPT response to the conversation array
      updatedConversation.push({
        role: "assistant",
        content: gptResponse.responseText,
      });

      // Update conversation state for MessageFeed component
      setConversation(updatedConversation);

      // Save both user message and GPT response to db
      const saveNewMessages = await saveMessages(
        [
          { content: message, role: "user" },
          { content: gptResponse.responseText, role: "assistant" },
        ],
        conversationId
      );

      // Update conversation Id
      if (conversationId === null) {
        setConversationId(saveNewMessages.conversationId);
      }

      // Clear the text area after submit
      setMessage("");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Adjust the textarea height based on its content
  const handleInput = (e) => {
    const maxHeight = 400; // Maximum height in pixels
    e.target.style.height = "inherit"; // Reset the height to recalculate
    const scrollHeight = e.target.scrollHeight; // Get the scroll height of the content
    // Height of text area is min of scroll height and max height
    e.target.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    // If content is less than max height, hide scroll bar
    e.target.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
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

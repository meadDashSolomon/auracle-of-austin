"use client";

import Link from "next/link";
import Sidebar from "./components/Sidebar";
import TextInput from "./components/TextInput";
import MessageFeed from "./components/MessageFeed";
import { useState, useEffect } from "react";

export default function Home() {
  const [conversation, setConversation] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  // Fetch initial conversation from database on mount
  // useEffect(() => {
  // await controller function that calls api route
  // set conversation and cId with returned data
  // }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Only show on larger screens and fixed width */}
      <div className="hidden lg:flex lg:flex-shrink-0 lg:w-1/5 bg-gray-800">
        <Sidebar />
      </div>
      {/* Chat Component - Takes the remaining space and flex-grow */}
      <div className="flex-1 flex flex-col">
        <MessageFeed messages={conversation} />
        <TextInput
          conversationId={conversationId}
          setConversation={setConversation}
          setConversationId={setConversationId}
        />
      </div>
    </div>
  );
}

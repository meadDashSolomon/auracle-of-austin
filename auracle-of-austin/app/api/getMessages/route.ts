import Conversation from "@/models/Conversation";
import { NextResponse } from "next/server";
import dbConnect from "@/util/db";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  await dbConnect();

  // Retrieve conversationId from query parameters
  const { conversationId } = req.query;

  // Retrieve old messages
  const conversation = await Conversation.findById(conversationId);

  // Format messages
  let formattedMessages = conversation.messages.map((msg) => {
    return {
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.message,
    };
  });

  // Return messages
  return NextResponse.json({
    messages: formattedMessages,
  });
}

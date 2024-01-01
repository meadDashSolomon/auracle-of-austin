import dbConnect from "@/util/db";
import Conversation from "@/models/Conversation";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  await dbConnect();

  const requestBody = await req.json();
  const { messages, conversationId } = requestBody;

  let conversation;
  // Check if conversation exists
  if (conversationId) {
    conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      // Handle case where conversation is not found
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }
  } else {
    // Create new conversation if no ID is provided
    conversation = new Conversation();
  }

  // Add new messages
  messages.forEach((message) => conversation.messages.push(message));

  // Save the updated or new conversation document
  await conversation.save();

  // Return the response
  return NextResponse.json({
    conversationId: conversation._id,
    ...conversation.toObject(),
  });
}

import dbConnect from "@/util/db";
import Conversation from "@/models/Conversation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  const { messages, conversationId } = await req.json();

  let conversation;
  // check if convo exists
  if (conversationId !== null) {
    conversation = await Conversation.findById(conversationId);
  } else {
    conversation = new Conversation();
  }

  // Add new messages
  messages.forEach((message) => conversation.messages.push(message));

  // Save the updated or new conversation document
  await conversation.save();

  // return the response
  return NextResponse.json({
    conversationId: conversation._id,
    ...conversation.toObject(),
  });
}

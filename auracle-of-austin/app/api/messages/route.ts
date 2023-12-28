import dbConnect from "@/util/db";
import Conversation from "@/models/Conversation";
import { NextResponse } from "next/server";

// Define POST func sans default export
export async function POST(req: Request) {
  await dbConnect();

  try {
    const { content, sender, conversationId } = await req.json();
    const newMessage = { content, sender };
    console.log(newMessage);

    // check if convo exists
    let conversation = await Conversation.findOne({ _id: conversationId });
    console.log(conversation);

    if (conversation) {
      // If the conversation exists, push the new message
      conversation.messages.push(newMessage);
    } else {
      // If no conversation exists, create a new one with the new message
      conversation = new Conversation({ messages: [newMessage] });
    }

    // Save the updated or new conversation document
    await conversation.save();

    // return the response
    return NextResponse.json(newMessage);
  } catch (error: any) {
    // log error to server console
    console.error(error);

    // return a json response w the error message and status code 400
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

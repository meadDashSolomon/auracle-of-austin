import Conversation from "@/models/Conversation";
import dbConnect from "@/util/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  await dbConnect();

  const { message, conversationId } = await req.json();
  let formattedMessages = [];

  // Retrieve chat history if conversationId is provided
  if (conversationId) {
    const conversation = await Conversation.findById(conversationId);

    // Format each message from the conversation history
    formattedMessages = conversation.messages.map((m) => {
      return {
        role: m.sender === "user" ? "user" : "assistant",
        content: m.message,
      };
    });
  }

  // Add new prompt to the message array
  formattedMessages.push({ role: "user", content: message });

  // Check for token limits and handle, if nec
  const gptResponse = await openai.chat.completions.create({
    messages: formattedMessages,
    model: "gpt-3.5-turbo",
  });
  console.log(gptResponse);

  // Extract the text content from the response
  const responseText = gptResponse.choices
    .map((choice) => choice.message.content)
    .join("\n");

  // Return a serialized response to the client
  return NextResponse.json({ responseText });
}

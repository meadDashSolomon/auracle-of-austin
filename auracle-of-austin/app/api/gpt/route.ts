import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Retrieve the messages array directly from the request
  const { messages } = await req.json();

  if (messages.length === 0) {
    console.log("Error: No messages provided!");
    return NextResponse.json({ error: "No messages provided" });
  }

  try {
    // Request response from GPT
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    // Extract the text content from the response
    const responseText = gptResponse.choices
      .map((choice) => choice.message.content)
      .join("\n");

    // Return a serialized response to the client
    return NextResponse.json({ responseText });
  } catch (error) {
    console.error("Error in GPT API call:", error);
    return NextResponse.json(
      { error: "Error in GPT API call" },
      { status: 500 }
    );
  }
}

import mongoose from "mongoose";

interface message {
  content: string;
  role: string;
  timestamp?: Date;
}

const messageSchema = new mongoose.Schema<message>({
  content: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "assistant"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model(
    "Conversation",
    new mongoose.Schema({
      messages: [messageSchema],
    })
  );

export default Conversation;

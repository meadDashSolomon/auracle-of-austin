import mongoose from "mongoose";

interface message {
  message: string;
  sender: string;
  timestamp?: Date;
}

const messageSchema = new mongoose.Schema<message>({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
    enum: ["user", "bot"],
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

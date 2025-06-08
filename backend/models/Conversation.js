import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender: {
    type: String, // "user", "elena", or "jess"
    enum: ["user", "elena", "jess"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Index for fast queries
conversationSchema.index({ userId: 1, timestamp: 1 });

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;

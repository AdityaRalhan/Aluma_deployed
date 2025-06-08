import express from "express";
import { saveConversation, getConversationsByUser } from "../controllers/conversationController.js";

const router = express.Router();

// Save new message
router.post("/", saveConversation);

// Fetch all messages for a user
router.get("/:userId", getConversationsByUser);

export default router;

import mongoose from "mongoose";
import Chat from "../models/Chat.js";

export async function getUsage(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [usage = {}] = await Chat.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          conversations: { $sum: 1 },
          messages: {
            $sum: { $size: { $ifNull: ["$messages", []] } },
          },
          userPrompts: {
            $sum: {
              $size: {
                $filter: {
                  input: { $ifNull: ["$messages", []] },
                  as: "message",
                  cond: { $eq: ["$$message.role", "user"] },
                },
              },
            },
          },
          assistantReplies: {
            $sum: {
              $size: {
                $filter: {
                  input: { $ifNull: ["$messages", []] },
                  as: "message",
                  cond: { $eq: ["$$message.role", "assistant"] },
                },
              },
            },
          },
          messagesLast7Days: {
            $sum: {
              $size: {
                $filter: {
                  input: { $ifNull: ["$messages", []] },
                  as: "message",
                  cond: { $gte: ["$$message.createdAt", since] },
                },
              },
            },
          },
        },
      },
      { $project: { _id: 0 } },
    ]);

    return res.json({
      success: true,
      usage: {
        conversations: usage.conversations || 0,
        messages: usage.messages || 0,
        userPrompts: usage.userPrompts || 0,
        assistantReplies: usage.assistantReplies || 0,
        messagesLast7Days: usage.messagesLast7Days || 0,
      },
    });
  } catch (error) {
    console.error("Get usage error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not load your usage summary.",
    });
  }
}

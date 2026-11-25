import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import {
  generateAIResponse,
  streamAIResponse,
  generatePDFResponse,
} from "../services/geminiService.js";

export async function listChats(req, res) {
  try {
    const search = String(req.query.search || "").trim().slice(0, 100);
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 30),
    );
    const filter = { userId: new mongoose.Types.ObjectId(req.userId) };
    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchRegex = new RegExp(escapedSearch, "i");
      filter.$or = [
        { title: searchRegex },
        { "messages.content": searchRegex },
      ];
    }
    const [chats, total] = await Promise.all([
      Chat.aggregate([
        { $match: filter },
        { $sort: { pinned: -1, updatedAt: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
          $project: {
            title: 1,
            pinned: { $ifNull: ["$pinned", false] },
            updatedAt: 1,
            createdAt: 1,
            messageCount: { $size: { $ifNull: ["$messages", []] } },
          },
        },
      ]),
      Chat.countDocuments(filter),
    ]);
    res.json({
      success: true,
      chats: chats.map((c) => ({
        id: String(c._id),
        title: c.title,
        pinned: c.pinned,
        updatedAt: c.updatedAt,
        messageCount: c.messageCount,
      })),
      pagination: { page, limit, total, hasMore: page * limit < total },
    });
  } catch (error) {
    console.error("List chats error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Could not load chat history." });
  }
}

export async function updateChat(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.chatId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid chat ID." });
    const body = req.body || {};
    if (Object.keys(body).some((key) => !["title", "pinned"].includes(key)))
      return res
        .status(400)
        .json({ success: false, message: "Unsupported conversation update." });

    const updates = {};
    if (Object.hasOwn(body, "title")) {
      if (typeof body.title !== "string" || !body.title.trim())
        return res.status(400).json({
          success: false,
          message: "Conversation title cannot be empty.",
        });
      const title = body.title.trim();
      if (title.length > 100)
        return res.status(400).json({
          success: false,
          message: "Conversation title must be 100 characters or fewer.",
        });
      updates.title = title;
    }
    if (Object.hasOwn(body, "pinned")) {
      if (typeof body.pinned !== "boolean")
        return res.status(400).json({
          success: false,
          message: "Pinned must be true or false.",
        });
      updates.pinned = body.pinned;
    }
    if (!Object.keys(updates).length)
      return res
        .status(400)
        .json({ success: false, message: "No conversation changes provided." });

    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.chatId, userId: req.userId },
      { $set: updates },
      { new: true, runValidators: true },
    )
      .select("title pinned updatedAt")
      .lean();
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found." });
    return res.json({
      success: true,
      chat: {
        id: String(chat._id),
        title: chat.title,
        pinned: chat.pinned || false,
        updatedAt: chat.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update chat error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not update this conversation.",
    });
  }
}

export async function exportChat(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.chatId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid chat ID." });
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      userId: req.userId,
    })
      .select("title createdAt messages")
      .lean();
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found." });

    const lines = [
      chat.title,
      `Created: ${new Date(chat.createdAt).toISOString()}`,
      "",
      ...chat.messages.flatMap((message) => [
        `${message.role === "assistant" ? "Nexora AI" : "You"} — ${new Date(message.createdAt).toISOString()}`,
        message.content,
        "",
      ]),
    ];
    const filename =
      chat.title.replace(/[^a-z0-9 _-]/gi, "").trim().slice(0, 80) ||
      "nexora-conversation";
    return res
      .type("text/plain")
      .set("Content-Disposition", `attachment; filename="${filename}.txt"`)
      .send(lines.join("\n"));
  } catch (error) {
    console.error("Export chat error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not export this conversation.",
    });
  }
}

export async function getChat(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.chatId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid chat ID." });
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      userId: req.userId,
    }).lean();
    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found." });
    res.json({
      success: true,
      chat: {
        id: String(chat._id),
        title: chat.title,
        messages: chat.messages,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        pdfName: chat.pdfName || null,
      },
    });
  } catch (error) {
    console.error("Get chat error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Could not open this chat." });
  }
}

export async function sendMessage(req, res) {
  try {
    const question = String(req.body.question || "").trim();
    const chatId = req.body.chatId;
    if (!question)
      return res
        .status(400)
        .json({ success: false, message: "Please type a message first." });
    if (question.length > 10000)
      return res
        .status(400)
        .json({
          success: false,
          message: "Message is too long (maximum 10,000 characters).",
        });

    let chat = null;
    if (chatId) {
      if (!mongoose.isValidObjectId(chatId))
        return res
          .status(400)
          .json({ success: false, message: "Invalid chat ID." });
      chat = await Chat.findOne({ _id: chatId, userId: req.userId });
      if (!chat)
        return res
          .status(404)
          .json({ success: false, message: "Chat not found." });
    }
    const history = chat
      ? chat.messages.map((m) => ({ role: m.role, content: m.content }))
      : [];
    const answer = await generateAIResponse(question, history);
    if (!chat)
      chat = new Chat({
        userId: req.userId,
        title: question.slice(0, 48) + (question.length > 48 ? "…" : ""),
        messages: [],
      });
    chat.messages.push(
      { role: "user", content: question },
      { role: "assistant", content: answer },
    );
    await chat.save();
    res
      .status(200)
      .json({
        success: true,
        chatId: String(chat._id),
        title: chat.title,
        answer,
        messages: chat.messages,
      });
  } catch (error) {
    console.error("Send message error:", error.message);
    const message = error.message?.includes("GEMINI_API_KEY")
      ? "Add your Gemini API key to server/.env and restart the server."
      : "Could not generate a reply. Check the server and AI API configuration.";
    res.status(500).json({ success: false, message });
  }
}

export async function streamMessage(req, res) {
  const question = String(req.body.question || "").trim();
  const chatId = req.body.chatId;
  const editMessageId = req.body.editMessageId;
  const regenerateMessageId = req.body.regenerateMessageId;

  if (!question && !regenerateMessageId)
    return res
      .status(400)
      .json({ success: false, message: "Please type a message first." });
  if (question.length > 10000)
    return res.status(400).json({
      success: false,
      message: "Message is too long (maximum 10,000 characters).",
    });
  if (editMessageId && regenerateMessageId)
    return res.status(400).json({
      success: false,
      message: "A message cannot be edited and regenerated at the same time.",
    });
  if ((editMessageId || regenerateMessageId) && !chatId)
    return res
      .status(400)
      .json({ success: false, message: "A conversation is required." });

  const abortController = new AbortController();
  const abortOnDisconnect = () => {
    if (!res.writableEnded) abortController.abort();
  };
  req.on("aborted", abortOnDisconnect);
  res.on("close", abortOnDisconnect);

  try {
    let chat = null;
    if (chatId) {
      if (!mongoose.isValidObjectId(chatId))
        return res
          .status(400)
          .json({ success: false, message: "Invalid chat ID." });
      chat = await Chat.findOne({ _id: chatId, userId: req.userId });
      if (!chat)
        return res
          .status(404)
          .json({ success: false, message: "Chat not found." });
    }

    let history = [];
    let prompt = question;
    if (regenerateMessageId) {
      const assistantIndex = chat.messages.findIndex(
        (message) =>
          message.role === "assistant" &&
          String(message._id) === String(regenerateMessageId),
      );
      if (assistantIndex < 1 || chat.messages[assistantIndex - 1].role !== "user")
        return res.status(400).json({
          success: false,
          message: "That response cannot be regenerated.",
        });
      prompt = chat.messages[assistantIndex - 1].content;
      history = chat.messages
        .slice(0, assistantIndex - 1)
        .map((message) => ({ role: message.role, content: message.content }));
      chat.messages.splice(assistantIndex);
    } else if (editMessageId) {
      const userIndex = chat.messages.findIndex(
        (message) =>
          message.role === "user" &&
          String(message._id) === String(editMessageId),
      );
      if (userIndex < 0)
        return res.status(404).json({
          success: false,
          message: "That message could not be found in this conversation.",
        });
      history = chat.messages
        .slice(0, userIndex)
        .map((message) => ({ role: message.role, content: message.content }));
      chat.messages.splice(userIndex);
    } else if (chat) {
      history = chat.messages.map((message) => ({
        role: message.role,
        content: message.content,
      }));
    }

    const isNewChat = !chat;
    if (!chat) {
      chat = new Chat({
        userId: req.userId,
        title: prompt.slice(0, 48) + (prompt.length > 48 ? "…" : ""),
        messages: [],
      });
    }

    res.status(200);
    res.set({
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });
    res.flushHeaders();
    const sendEvent = (event) => {
      if (!res.destroyed && !res.writableEnded)
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    };
    sendEvent({ type: "start" });

    const answer = await streamAIResponse(prompt, history, {
      signal: abortController.signal,
      onChunk: (text) => sendEvent({ type: "delta", text }),
    });
    if (abortController.signal.aborted) return;

    if (!regenerateMessageId)
      chat.messages.push({ role: "user", content: prompt });
    chat.messages.push({ role: "assistant", content: answer });
    await chat.save();
    sendEvent({
      type: "done",
      chatId: String(chat._id),
      title: chat.title,
      messages: chat.messages,
      isNewChat,
    });
    res.end();
  } catch (error) {
    if (abortController.signal.aborted) return;
    console.error("Stream message error:", error.message);
    if (res.headersSent) {
      const message = error.message?.includes("GEMINI_API_KEY")
        ? "Add your Gemini API key to server/.env and restart the server."
        : "Could not generate a reply. Check the server and AI API configuration.";
      if (!res.destroyed && !res.writableEnded) {
        res.write(`data: ${JSON.stringify({ type: "error", message })}\n\n`);
        res.end();
      }
      return;
    }
    res.status(500).json({
      success: false,
      message: "Could not start response generation.",
    });
  }
}

export async function deleteChat(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.chatId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid chat ID." });
    const result = await Chat.deleteOne({
      _id: req.params.chatId,
      userId: req.userId,
    });
    if (!result.deletedCount)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found." });
    res.json({ success: true, message: "Chat deleted." });
  } catch (error) {
    console.error("Delete chat error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Could not delete this chat." });
  }
}


export async function chatWithPDF(req, res) {
  try {
    const question = String(req.body?.question || '').trim();
    const chatId = req.body?.chatId;
    const pdfBase64 = typeof req.body?.pdfBase64 === 'string' ? req.body.pdfBase64 : '';
    const pdfName = String(req.body?.pdfName || 'document.pdf').slice(0, 180);
    if (!question) return res.status(400).json({ success: false, message: 'Enter a question about your PDF.' });
    if (question.length > 8000) return res.status(400).json({ success: false, message: 'Question is too long (maximum 8,000 characters).' });
    // 7 MB raw PDF limit keeps the base64 payload safely below MongoDB's 16 MB document limit.
    if (pdfBase64 && (!/^[A-Za-z0-9+/]+={0,2}$/.test(pdfBase64) || Buffer.byteLength(pdfBase64, 'base64') > 7 * 1024 * 1024))
      return res.status(400).json({ success: false, message: 'PDF must be a valid file smaller than 7 MB.' });
    if (pdfBase64 && !pdfName.toLowerCase().endsWith('.pdf')) return res.status(400).json({ success: false, message: 'Only PDF files are supported.' });
    if (pdfBase64 && !Buffer.from(pdfBase64, 'base64').subarray(0, 5).toString('ascii').startsWith('%PDF-')) return res.status(400).json({ success: false, message: 'The selected file does not appear to be a valid PDF.' });
    let chat = null;
    if (chatId) {
      if (!mongoose.isValidObjectId(chatId)) return res.status(400).json({ success: false, message: 'Invalid chat ID.' });
      chat = await Chat.findOne({ _id: chatId, userId: req.userId }).select('+pdfData');
      if (!chat) return res.status(404).json({ success: false, message: 'Chat not found.' });
    }
    if (pdfBase64) {
      if (!chat) chat = new Chat({ userId: req.userId, title: `PDF: ${pdfName}`.slice(0, 100), messages: [] });
      chat.pdfData = pdfBase64;
      chat.pdfName = pdfName;
    }
    if (!chat?.pdfData) return res.status(400).json({ success: false, message: 'Attach a PDF to start document chat.' });
    const history = chat.messages.map(m => ({ role: m.role, content: m.content }));
    const answer = await generatePDFResponse(question, chat.pdfData, history);
    chat.messages.push({ role: 'user', content: `[PDF: ${chat.pdfName}] ${question}` }, { role: 'assistant', content: answer });
    await chat.save();
    return res.json({ success: true, chatId: String(chat._id), title: chat.title, pdfName: chat.pdfName, answer, messages: chat.messages });
  } catch (error) {
    console.error('PDF chat error:', error.message);
    const message = error.message?.includes('GEMINI_API_KEY') ? 'Add your Gemini API key to server/.env and restart the server.' : 'Could not analyze this PDF. Confirm it is a readable PDF and try again.';
    return res.status(500).json({ success: false, message });
  }
}

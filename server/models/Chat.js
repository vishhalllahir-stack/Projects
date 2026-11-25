import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true, maxlength: 20000 }
}, { _id: true, timestamps: true });

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, default: 'New chat', maxlength: 100 },
  pinned: { type: Boolean, default: false },
  // PDF bytes are private to the owning user and excluded from ordinary queries.
  pdfName: { type: String, maxlength: 180, default: null },
  pdfData: { type: String, select: false, default: null },
  messages: { type: [messageSchema], default: [] }
}, { timestamps: true });

chatSchema.index({ userId: 1, pinned: -1, updatedAt: -1 });

export default mongoose.model('Chat', chatSchema);

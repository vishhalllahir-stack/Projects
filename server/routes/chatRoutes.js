import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  listChats,
  getChat,
  sendMessage,
  streamMessage,
  updateChat,
  exportChat,
  deleteChat,
  chatWithPDF,
} from '../controllers/chatController.js';
const router = Router();
router.use(authMiddleware);
router.get('/', listChats);
router.post('/stream', streamMessage);
router.post('/pdf', chatWithPDF);
router.post('/', sendMessage);
router.get('/:chatId/export', exportChat);
router.patch('/:chatId', updateChat);
router.get('/:chatId', getChat);
router.delete('/:chatId', deleteChat);
export default router;

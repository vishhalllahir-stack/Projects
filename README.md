# AI Chatbot Web App

Full-stack chatbot with React + Vite, Express, MongoDB, JWT authentication, and Google Gemini.

## Requirements
- Node.js 18+ (20+ recommended)
- MongoDB running locally or a MongoDB Atlas connection string
- Gemini API key

## 1. Configure server
Open `server/.env.example`, copy it to `server/.env`, and fill in your own values. Never share or commit `.env`.
For email password recovery, set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM` in `server/.env`. For Gmail, enable 2-Step Verification, create an App Password in your Google Account security settings, and use that app password (not your regular account password) for `SMTP_PASS`. For local development without SMTP, set `NODE_ENV=development` and `ENABLE_LOCAL_PASSWORD_RESET=true`. This development-only option returns a one-time reset link in the browser and only works for requests from the local computer; never enable it in production. Restart the server after changing `.env`.

## 2. Install dependencies
From this folder run:
```bash
npm run install:all
```

## 3. Run
Open two terminals in the project root:
```bash
npm run dev:server
```
```bash
npm run dev:client
```
Open the Vite URL shown in the client terminal (normally http://localhost:5173).
During local development, Vite proxies `/api` requests to the backend at `http://localhost:5001`. Set `VITE_API_URL` in `client/.env` if the API is hosted elsewhere.

## Features
- Register and log in with hashed passwords and JWT
- Secure, one-time email password reset links (expire after 15 minutes)
- Protected AI chat API
- Gemini-powered answers
- Per-user saved chat history in MongoDB
- Open and delete previous chats
- Responsive chat UI, loading and error states
- Ivory Blue light mode and persistent dark mode
- Streaming Gemini replies with stop and retry controls
- Edit and resend prompts, regenerate the latest answer, and copy Markdown/code responses
- Six prompt starters for coding, resumes, study plans, content, translation, and project ideas
- Authenticated Gemini-backed AI tools with validated inputs and copy/continue actions
- Account settings for updating profile details and changing a password with current-password verification
- An account-scoped activity summary based on saved conversations and messages
- PDF chat: attach a PDF up to 7 MB and ask questions; PDF data is stored privately on its owner-scoped chat document
- Voice input via browser speech recognition and read-aloud via speech synthesis

## API
- `POST /api/auth/register` `{ "name", "email", "password" }`
- `POST /api/auth/login` `{ "email", "password" }`
- `POST /api/auth/forgot-password` `{ "email" }`
- `POST /api/auth/reset-password` `{ "token", "password" }`
- `GET /api/chat` (Bearer token): list saved chats
- `GET /api/chat/:chatId` (Bearer token): get a saved chat
- `POST /api/chat` (Bearer token) `{ "question", "chatId?" }`
- `DELETE /api/chat/:chatId` (Bearer token)
- `GET /api/health`

### Streaming chat

Authenticated clients can use `POST /api/chat/stream` with the same `{ "question", "chatId?" }` fields as the standard chat endpoint. Optional `editMessageId` and `regenerateMessageId` fields support editing a saved user prompt or regenerating its assistant reply. The endpoint streams Server-Sent Events (`delta`, `done`, and `error`); messages are saved only after generation completes. Stopping a response cancels the client-side provider request where supported; Google may still account for work already received.

The non-streaming `POST /api/chat` endpoint remains available for existing clients.
`GET /api/chat` accepts optional `search`, `page`, and `limit` query parameters and returns paginated metadata without returning message bodies. `PATCH /api/chat/:chatId` accepts a validated `title` and/or `pinned` update. `GET /api/chat/:chatId/export` returns a user-scoped TXT export. The chat UI also offers **Print / Save as PDF**, which uses the browser print dialog.

### AI tools

The authenticated `POST /api/tools/:toolId` endpoint generates a result through the configured Gemini service. Supported tool IDs are `codeAssistant`, `resumeBuilder`, `studyPlanner`, `contentWriter`, `translationAssistant`, and `projectIdeas`. Send the selected tool's validated fields in an `input` object. Tool outputs are not saved as conversations unless the user chooses **Continue in chat**, which uses the existing chat workflow.

### Account and usage

- `GET /api/account/me` returns the authenticated user's account profile.
- `PATCH /api/account/me` updates `name` and/or `email`. Changing the email or password requires `currentPassword`; password changes also require `newPassword` (at least 8 characters).
- `GET /api/usage` returns counts derived only from the authenticated user's saved conversations.

The usage summary counts saved conversations, prompts, assistant replies, and messages from the last seven days. It does not report Gemini provider token usage, quota, or billing. PDF chat is available at `POST /api/chat/pdf` (authenticated). Send JSON `{ "question", "chatId?", "pdfName?", "pdfBase64?" }`. Attach a PDF on the first request; follow-up questions reuse the same owner-scoped chat. PDFs are limited to 7 MB. Voice input/read-aloud use browser speech APIs.

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Bot,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  FileText,
  Globe2,
  LogOut,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Mic,
  Volume2,
  Pencil,
  Pin,
  PinOff,
  Download,
  Printer,
  Plus,
  Search,
  Send,
  Sparkles,
  Sun,
  Moon,
  RotateCcw,
  Square,
  Trash2,
  UserRound,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { AccountSettings, UsageSummary } from "./AccountDialogs.jsx";

const API = import.meta.env.VITE_API_URL || "/api";
const MarkdownContent = lazy(() => import("./MarkdownContent.jsx"));
const AIToolsHub = lazy(() => import("./AIToolsHub.jsx"));
const starters = [
  {
    icon: Code2,
    title: "Code Assistant",
    description: "Explain, debug, or refine a code snippet.",
    prompt: "Explain, debug, or improve this code: [paste your code]",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Shape your experience into a polished resume.",
    prompt:
      "Help me draft a resume using only my real experience and qualifications. My details: [add your details]",
  },
  {
    icon: WandSparkles,
    title: "Study Planner",
    description: "Build a practical plan around your goals.",
    prompt:
      "Create a practical 7-day study plan. My subject and goal: [add details]",
  },
  {
    icon: Globe2,
    title: "Content Writer",
    description: "Draft thoughtful content for any audience.",
    prompt:
      "Write engaging content. Topic, tone, and length: [add details]",
  },
  {
    icon: MessageSquare,
    title: "Translation Assistant",
    description: "Translate while keeping the original tone.",
    prompt: "Translate this text to [language], preserving its tone: [paste text]",
  },
  {
    icon: Zap,
    title: "Project Ideas",
    description: "Turn your skills into a project roadmap.",
    prompt:
      "Suggest projects for my skill level [beginner/intermediate/advanced] and technologies [add stack].",
  },
];

function getInitialTheme() {
  const theme = document.documentElement.dataset.theme;
  return theme === "light" || theme === "dark" ? theme : "light";
}

function ThemeToggle({ theme, onToggle }) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      className="icon-btn theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <Icon size={17} />
    </button>
  );
}

function formatMessageTime(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

async function api(path, options = {}, token = "") {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false)
    throw new Error(data.message || "Something went wrong.");
  return data;
}

function AuthScreen({ onAuth, theme, onToggleTheme }) {
  const [mode, setMode] = useState(() =>
    new URLSearchParams(window.location.search).has("resetToken")
      ? "reset"
      : "login",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    setResetUrl("");
    try {
      if (mode === "reset" && password !== confirmPassword) {
        throw new Error("The passwords do not match.");
      }
      if (mode === "forgot") {
        const data = await api("/auth/forgot-password", {
          method: "POST",
          body: JSON.stringify({ email }),
        });
        setNotice(data.message);
        setResetUrl(data.resetUrl || "");
        return;
      }
      if (mode === "reset") {
        const data = await api("/auth/reset-password", {
          method: "POST",
          body: JSON.stringify({
            token: new URLSearchParams(window.location.search).get("resetToken"),
            password,
          }),
        });
        window.history.replaceState({}, "", window.location.pathname);
        setPassword("");
        setConfirmPassword("");
        setMode("login");
        setNotice(data.message);
        return;
      }
      const data = await api(
        `/auth/${mode}`,
        {
          method: "POST",
          body: JSON.stringify(
            mode === "login" ? { email, password } : { name, email, password },
          ),
        },
      );
      onAuth(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="auth-shell">
      <div className="auth-art">
        <div className="brand">
          <span className="brand-icon">
            <img src="/nexora-mark.png" alt="" />
          </span>{" "}
          Nexora<span className="brand-ai">AI</span>
        </div>
        <div className="art-copy">
          <div className="eyebrow">
            <span className="pulse-dot" /> YOUR PERSONAL AI COMPANION
          </div>
          <h1>
            Ideas become
            <br />
            <span>possibilities.</span>
          </h1>
          <p>
            Think clearly, create boldly, and get more done with an AI assistant
            designed around you.
          </p>
          <div className="orbit-wrap">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit-core">
              <Sparkles size={34} />
            </div>
            <span className="orbit-chip chip-a">
              <Code2 size={17} />
            </span>
            <span className="orbit-chip chip-b">
              <FileText size={17} />
            </span>
            <span className="orbit-chip chip-c">
              <Zap size={17} />
            </span>
          </div>
        </div>
        <div className="art-footer">
          <span>✦ Made for curious minds</span>
          <span>PRIVATE · PERSONAL · POWERFUL</span>
        </div>
      </div>
      <section className="auth-panel">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <div className="auth-mobile-brand">
          <span className="brand-icon">
            <img src="/nexora-mark.png" alt="" />
          </span>{" "}
          Nexora<span className="brand-ai">AI</span>
        </div>
        <div className="auth-card">
          <div className="auth-heading">
            <span className="mini-icon">
              <Bot size={22} />
            </span>
            <p className="eyebrow">
              {mode === "login"
                ? "WELCOME BACK"
                : mode === "register"
                  ? "WELCOME ABOARD"
                  : mode === "forgot"
                    ? "ACCOUNT RECOVERY"
                    : "SECURE YOUR ACCOUNT"}
            </p>
            <h2>
              {mode === "login"
                ? "Your space awaits."
                : mode === "register"
                  ? "Create your space."
                  : mode === "forgot"
                    ? "Reset your password."
                    : "Choose a new password."}
            </h2>
            <p>
              {mode === "login"
                ? "Sign in to pick up where you left off."
                : mode === "register"
                  ? "A few details and you’re ready to go."
                  : mode === "forgot"
                    ? "We’ll email you a secure reset link."
                    : "Choose a new password for your account."}
            </p>
          </div>
          {(mode === "login" || mode === "register") && (
            <div className="auth-tabs">
              <button
                className={mode === "login" ? "active" : ""}
                onClick={() => {
                  setMode("login");
                  setError("");
                  setNotice("");
                }}
              >
                Sign in
              </button>
              <button
                className={mode === "register" ? "active" : ""}
                onClick={() => {
                  setMode("register");
                  setError("");
                  setNotice("");
                }}
              >
                Create account
              </button>
            </div>
          )}
          <form onSubmit={submit} className="auth-form">
            {mode === "register" && (
              <label>
                Your name
                <input
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  required
                  maxLength={80}
                />
              </label>
            )}
            {mode !== "reset" && (
              <label>
                Email address
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>
            )}
            {mode !== "forgot" && (
              <label>
                Password
                <input
                  type="password"
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />
              </label>
            )}
            {mode === "reset" && (
              <label>
                Confirm new password
                <input
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your new password again"
                  minLength={8}
                  required
                />
              </label>
            )}
            {error && <div className="alert error">{error}</div>}
            {notice && <div className="alert success">{notice}</div>}
            {resetUrl && (
              <a className="auth-link local-reset-link" href={resetUrl}>
                Open password reset link
              </a>
            )}
            <button className="primary-btn auth-submit" disabled={busy}>
              {busy ? (
                <span className="spinner" />
              ) : (
                <>
                  {mode === "login"
                    ? "Sign in to Nexora"
                    : mode === "register"
                      ? "Create my account"
                      : mode === "forgot"
                        ? "Email me a reset link"
                        : "Update password"}{" "}
                  <ArrowUp size={17} />
                </>
              )}
            </button>
          </form>
          {mode === "login" && (
            <button
              type="button"
              className="auth-link"
              onClick={() => {
                setMode("forgot");
                setError("");
                setNotice("");
              }}
            >
              Forgot password?
            </button>
          )}
          {(mode === "forgot" || mode === "reset") && (
            <button
              type="button"
              className="auth-link"
              onClick={() => {
                window.history.replaceState({}, "", window.location.pathname);
                setMode("login");
                setError("");
                setNotice("");
              }}
            >
              Back to sign in
            </button>
          )}
          <p className="auth-terms">
            <Check size={14} /> Your conversations are saved to your account.
          </p>
        </div>
        <div className="auth-bottom">
          Powered by Google Gemini <span>·</span> One Workspace. Infinite
          Possibilities.
        </div>
      </section>
    </main>
  );
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nova-session") || "null");
    } catch {
      return null;
    }
  });
  const [chats, setChats] = useState([]);
  const [chatPage, setChatPage] = useState(1);
  const [chatTotal, setChatTotal] = useState(0);
  const [hasMoreChats, setHasMoreChats] = useState(false);
  const [loadingMoreChats, setLoadingMoreChats] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfChatMode, setPdfChatMode] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);
  const pdfInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [error, setError] = useState("");
  const [streamingContent, setStreamingContent] = useState("");
  const [retryAction, setRetryAction] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [accountDialog, setAccountDialog] = useState(null);
  const [search, setSearch] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const activeRequestRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);
  const token = session?.token;
  const hasAssistantMessage = messages.some((message) => message.role === "assistant");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#0B1020" : "#F0F9FF");
    try {
      localStorage.setItem("nova-theme", theme);
    } catch (error) {
      console.warn("Could not save the selected theme:", error);
    }
  }, [theme]);
  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }
  const loadChats = useCallback(async ({ term = "", page = 1, append = false } = {}) => {
    if (!token) return;
    if (append) setLoadingMoreChats(true);
    try {
      const params = new URLSearchParams({
        search: term,
        page: String(page),
        limit: "30",
      });
      const data = await api(`/chat?${params}`, {}, token);
      setChats((current) =>
        append ? [...current, ...(data.chats || [])] : data.chats || [],
      );
      setChatPage(data.pagination?.page || page);
      setChatTotal(data.pagination?.total || 0);
      setHasMoreChats(Boolean(data.pagination?.hasMore));
    } catch (e) {
      if (
        e.message.toLowerCase().includes("session") ||
        e.message.toLowerCase().includes("log in")
      )
        logout();
      else setError(e.message);
    } finally {
      setLoadingMoreChats(false);
    }
  }, [token]);
  useEffect(() => {
    if (!token) return;
    const timeout = window.setTimeout(
      () => loadChats({ term: search }),
      search ? 250 : 0,
    );
    return () => window.clearTimeout(timeout);
  }, [token, search, loadChats]);
  useEffect(() => {
    if (shouldAutoScrollRef.current)
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy, streamingContent]);
  function onAuth(data) {
    const next = { token: data.token, user: data.user };
    localStorage.setItem("nova-session", JSON.stringify(next));
    setSession(next);
  }
  function updateSessionUser(user) {
    const next = { ...session, user };
    localStorage.setItem("nova-session", JSON.stringify(next));
    setSession(next);
  }
  function cancelActiveRequest() {
    const request = activeRequestRef.current;
    activeRequestRef.current = null;
    if (request) {
      request.abort();
      setBusy(false);
      setStreamingContent("");
    }
  }
  function logout() {
    cancelActiveRequest();
    localStorage.removeItem("nova-session");
    setSession(null);
    setChats([]);
    setMessages([]);
    setActiveId(null);
  }
  function newChat() {
    cancelActiveRequest();
    setActiveId(null);
    setMessages([]);
    setPdfFile(null);
    setPdfChatMode(false);
    setError("");
    setInput("");
    setEditingMessageId(null);
    setRetryAction(null);
    setCopiedMessageId(null);
    setSidebarOpen(false);
    inputRef.current?.focus();
  }
  async function openChat(id) {
    cancelActiveRequest();
    setActiveId(id);
    setLoadingChat(true);
    setError("");
    setSidebarOpen(false);
    try {
      const data = await api(`/chat/${id}`, {}, token);
      setMessages(data.chat.messages || []);
      setPdfChatMode(Boolean(data.chat.pdfName));
      setPdfFile(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingChat(false);
    }
  }
  async function removeChat(id, e) {
    e.stopPropagation();
    if (!window.confirm("Delete this conversation?")) return;
    try {
      await api(`/chat/${id}`, { method: "DELETE" }, token);
      setChats((old) => old.filter((c) => c.id !== id));
      setChatTotal((count) => Math.max(0, count - 1));
      if (activeId === id) newChat();
    } catch (err) {
      setError(err.message);
    }
  }
  async function renameChat(chat, event) {
    event.stopPropagation();
    const title = window.prompt("Rename conversation", chat.title);
    if (title === null || !title.trim() || title.trim() === chat.title) return;
    try {
      await api(
        `/chat/${chat.id}`,
        { method: "PATCH", body: JSON.stringify({ title: title.trim() }) },
        token,
      );
      await loadChats({ term: search });
    } catch (requestError) {
      setError(requestError.message);
    }
  }
  async function togglePinnedChat(chat, event) {
    event.stopPropagation();
    try {
      await api(
        `/chat/${chat.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ pinned: !chat.pinned }),
        },
        token,
      );
      await loadChats({ term: search });
    } catch (requestError) {
      setError(requestError.message);
    }
  }
  async function downloadChatText() {
    if (!activeId) return;
    try {
      const response = await fetch(`${API}/chat/${activeId}/export`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Could not export this conversation.");
      }
      const file = await response.blob();
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "nexora-conversation.txt";
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (requestError) {
      setError(requestError.message);
    }
  }
  function printChatPdf() {
    if (!activeId) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      setError("Allow pop-ups to print or save this conversation as a PDF.");
      return;
    }
    printWindow.opener = null;
    printWindow.document.open();
    printWindow.document.write(
      "<!doctype html><html lang='en'><head><meta charset='utf-8'><title>Nexora AI conversation</title></head><body></body></html>",
    );
    printWindow.document.close();
    printWindow.document.title =
      chats.find((chat) => chat.id === activeId)?.title || "Nexora AI conversation";
    const style = printWindow.document.createElement("style");
    style.textContent =
      "body{font:14px/1.6 system-ui,sans-serif;color:#172554;margin:40px}h1{font-size:22px}pre{font:inherit;white-space:pre-wrap;overflow-wrap:anywhere}";
    const heading = printWindow.document.createElement("h1");
    heading.textContent = printWindow.document.title;
    const content = printWindow.document.createElement("pre");
    content.textContent = messages
      .map(
        (message) =>
          `${message.role === "assistant" ? "Nexora AI" : session.user?.name || "You"}${formatMessageTime(message.createdAt) ? ` · ${formatMessageTime(message.createdAt)}` : ""}\n${message.content}`,
      )
      .join("\n\n");
    printWindow.document.head.append(style);
    printWindow.document.body.append(heading, content);
    printWindow.focus();
    window.setTimeout(() => printWindow.print(), 250);
  }
  async function copyResponse(message) {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedMessageId(String(message._id));
      window.setTimeout(() => setCopiedMessageId(null), 1800);
    } catch {
      setError("Could not copy the response. Check your browser clipboard permissions.");
    }
  }
  async function sendPDFQuestion(text = input) {
    const question = text.trim();
    if (!question || busy) return;
    if (!pdfFile && !activeId) { setError('Choose a PDF first, then ask a question about it.'); return; }
    setBusy(true); setError(''); setInput('');
    const previousMessages = messages;
    setMessages([...messages, { role: 'user', content: question, temp: true, createdAt: new Date() }]);
    try {
      let pdfBase64 = '';
      if (pdfFile) {
        pdfBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
          reader.onerror = () => reject(new Error('Could not read the selected PDF.'));
          reader.readAsDataURL(pdfFile);
        });
      }
      const data = await api('/chat/pdf', { method: 'POST', body: JSON.stringify({ question, ...(activeId ? { chatId: activeId } : {}), ...(pdfBase64 ? { pdfBase64, pdfName: pdfFile.name } : {}) }) }, token);
      setActiveId(data.chatId); setMessages(data.messages || []); setPdfFile(null); setPdfChatMode(true);
      await loadChats({ term: search });
    } catch (e) { setMessages(previousMessages); setInput(question); setError(e.message); }
    finally { setBusy(false); inputRef.current?.focus(); }
  }
  function toggleVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setError('Voice input is not supported in this browser. Try Chrome or Edge.'); return; }
    if (voiceListening) { recognitionRef.current?.stop(); setVoiceListening(false); return; }
    const recognition = new SpeechRecognition(); recognition.lang = 'en-IN'; recognition.interimResults = true; recognition.continuous = false;
    recognition.onresult = (event) => { const transcript = Array.from(event.results).map(r => r[0].transcript).join(''); setInput(transcript); };
    recognition.onerror = () => setVoiceListening(false); recognition.onend = () => setVoiceListening(false);
    recognitionRef.current = recognition; recognition.start(); setVoiceListening(true);
  }
  function speakLatestAnswer() {
    const latest = [...messages].reverse().find(m => m.role === 'assistant');
    if (!latest) {
      setError("There is no Nexora response to read aloud yet.");
      return;
    }
    if (
      !("speechSynthesis" in window) ||
      typeof window.SpeechSynthesisUtterance !== "function"
    ) {
      setError("Text-to-speech is not supported in this browser. Try Chrome or Edge.");
      return;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(latest.content));
  }
  async function sendMessage(text = input, options = {}) {
    const question = text.trim();
    const isRegenerating = Boolean(options.regenerateMessageId);
    if ((!question && !isRegenerating) || busy) return;
    const controller = new AbortController();
    activeRequestRef.current = controller;
    const previousMessages = messages;
    const requestOptions = {
      ...(options.editMessageId ? { editMessageId: options.editMessageId } : {}),
      ...(options.regenerateMessageId
        ? { regenerateMessageId: options.regenerateMessageId }
        : {}),
    };
    if (!isRegenerating) setInput("");
    setError("");
    setRetryAction(null);
    setStreamingContent("");
    if (requestOptions.editMessageId) {
      const editIndex = messages.findIndex(
        (message) => String(message._id) === String(requestOptions.editMessageId),
      );
      setMessages([
        ...messages.slice(0, editIndex),
        { role: "user", content: question, temp: true, createdAt: new Date() },
      ]);
      setEditingMessageId(null);
    } else if (requestOptions.regenerateMessageId) {
      const responseIndex = messages.findIndex(
        (message) =>
          String(message._id) === String(requestOptions.regenerateMessageId),
      );
      setMessages(messages.slice(0, responseIndex));
    } else {
      setMessages([
        ...messages,
        { role: "user", content: question, temp: true, createdAt: new Date() },
      ]);
    }
    setBusy(true);
    try {
      const response = await fetch(`${API}/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question,
          ...(activeId ? { chatId: activeId } : {}),
          ...requestOptions,
        }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Could not start response generation.");
      }
      if (!response.body) throw new Error("Streaming is not supported by this connection.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let completed = false;
      while (!completed) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const events = buffer.split(/\r?\n\r?\n/);
        buffer = events.pop() || "";
        for (const eventText of events) {
          const dataLine = eventText
            .split(/\r?\n/)
            .find((line) => line.startsWith("data: "));
          if (!dataLine) continue;
          const event = JSON.parse(dataLine.slice(6));
          if (event.type === "delta") {
            setStreamingContent((current) => current + event.text);
          } else if (event.type === "error") {
            throw new Error(event.message);
          } else if (event.type === "done") {
            completed = true;
            setActiveId(event.chatId);
            setMessages(event.messages || []);
            setStreamingContent("");
            await loadChats({ term: search });
          }
        }
        if (done) break;
      }
      if (!completed) throw new Error("The response ended before it was saved. Please retry.");
    } catch (err) {
      if (activeRequestRef.current === controller) {
        setMessages(previousMessages);
        setStreamingContent("");
        if (err.name === "AbortError") {
          setInput((current) => current.trim() ? current : question || input);
          setEditingMessageId(requestOptions.editMessageId || null);
          setError("Generation stopped. No changes were saved.");
        } else {
          setInput((current) => current.trim() ? current : question || input);
          setEditingMessageId(requestOptions.editMessageId || null);
          setError(err.message);
          setRetryAction({ question, options: requestOptions });
        }
      }
    } finally {
      if (activeRequestRef.current === controller) {
        activeRequestRef.current = null;
        setBusy(false);
        inputRef.current?.focus();
      }
    }
  }
  function stopGeneration() {
    activeRequestRef.current?.abort();
  }
  function retryGeneration() {
    if (retryAction)
      sendMessage(retryAction.question, retryAction.options);
  }
  if (!session?.token)
    return (
      <AuthScreen
        onAuth={onAuth}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  const grouped = chats.reduce((acc, chat) => {
    const today = new Date();
    const updated = new Date(chat.updatedAt);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const day = updated.toDateString() === today.toDateString()
      ? "Today"
      : updated.toDateString() === yesterday.toDateString()
        ? "Yesterday"
        : "Older";
    (acc[day] ||= []).push(chat);
    return acc;
  }, {});
  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <div className="brand">
            <span className="brand-icon">
              <img src="/nexora-mark.png" alt="" />
            </span>{" "}
            Nexora<span className="brand-ai">AI</span>
          </div>
          <button
            className="icon-btn mobile-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
        <button className="new-chat-btn" onClick={newChat}>
          <Plus size={17} /> New conversation <span>⌘ K</span>
        </button>
        <button
          className="tools-nav-btn"
          onClick={() => {
            setToolsOpen(true);
            setSidebarOpen(false);
          }}
        >
          <WandSparkles size={16} /> AI tools
        </button>
        <div className="side-search">
          <Search size={15} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations"
          />
        </div>
        <div className="history-label">
          YOUR WORKSPACE <span>{chatTotal}</span>
        </div>
        <div className="chat-history">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="history-group">
              <p>{group}</p>
              {items.map((chat) => (
                <button
                  key={chat.id}
                  className={`history-item ${activeId === chat.id ? "selected" : ""}`}
                  onClick={() => openChat(chat.id)}
                >
                  <MessageSquare size={15} />
                  <span>{chat.title}</span>
                  {chat.pinned && (
                    <span className="history-pinned" title="Pinned conversation">
                      <Pin size={12} />
                    </span>
                  )}
                  <span
                    className="history-action history-rename"
                    role="button"
                    tabIndex={0}
                    aria-label="Rename conversation"
                    title="Rename conversation"
                    onClick={(event) => renameChat(chat, event)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ")
                        renameChat(chat, event);
                    }}
                  >
                    <Pencil size={13} />
                  </span>
                  <span
                    className="history-action history-pin"
                    role="button"
                    tabIndex={0}
                    aria-label={chat.pinned ? "Unpin conversation" : "Pin conversation"}
                    title={chat.pinned ? "Unpin conversation" : "Pin conversation"}
                    onClick={(event) => togglePinnedChat(chat, event)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ")
                        togglePinnedChat(chat, event);
                    }}
                  >
                    {chat.pinned ? <PinOff size={13} /> : <Pin size={13} />}
                  </span>
                  <span
                    className="history-delete"
                    tabIndex={0}
                    role="button"
                    aria-label="Delete conversation"
                    onClick={(e) => removeChat(chat.id, e)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ")
                        removeChat(chat.id, event);
                    }}
                  >
                    <Trash2 size={14} />
                  </span>
                </button>
              ))}
            </div>
          ))}
          {!chats.length && (
            <div className="empty-history">
              {search
                ? "No conversations match your search."
                : "Your conversations will appear here."}
            </div>
          )}
          {hasMoreChats && (
            <button
              className="load-more-chats"
              type="button"
              disabled={loadingMoreChats}
              onClick={() =>
                loadChats({
                  term: search,
                  page: chatPage + 1,
                  append: true,
                })
              }
            >
              {loadingMoreChats ? "Loading…" : "Load more"}
            </button>
          )}
        </div>
        <div className="sidebar-bottom">
          <div className="plan-card">
            <div className="plan-symbol">
              <Sparkles size={16} />
            </div>
            <div>
              <strong>Your creative space</strong>
              <p>One question can change everything.</p>
            </div>
          </div>
          <div className="profile-row">
            <div className="avatar">
              {session.user?.name?.slice(0, 1).toUpperCase() || "U"}
            </div>
            <div className="profile-copy">
              <strong>{session.user?.name || "Your account"}</strong>
              <span>{session.user?.email}</span>
            </div>
            <button
              className="icon-btn account-settings-btn"
              type="button"
              onClick={() => setAccountDialog("account")}
              aria-label="Account settings"
              title="Account settings"
            >
              <UserRound size={15} />
            </button>
            <button
              className="icon-btn logout-btn"
              title="Sign out"
              onClick={logout}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
      {sidebarOpen && (
        <button
          className="mobile-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}
      {toolsOpen && (
        <Suspense fallback={<div className="tools-loading">Opening AI tools…</div>}>
          <AIToolsHub
            token={token}
            onClose={() => setToolsOpen(false)}
            onContinueInChat={(prompt) => {
              setToolsOpen(false);
              if (busy) setInput(prompt);
              else sendMessage(prompt);
            }}
          />
        </Suspense>
      )}
      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-btn mobile-menu"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={19} />
            </button>
            <span className="topbar-context">Workspace</span>
            <span className="crumb">/</span>
            <span className="topbar-current">
              {activeId
                ? chats.find((c) => c.id === activeId)?.title || "Conversation"
                : "New conversation"}
            </span>
          </div>
          <div className="topbar-right">
            {activeId && (
              <>
                <button
                  className="icon-btn conversation-export-btn"
                  type="button"
                  onClick={downloadChatText}
                  aria-label="Download conversation as text"
                  title="Download as TXT"
                >
                  <Download size={16} />
                </button>
                <button
                  className="icon-btn conversation-export-btn"
                  type="button"
                  onClick={printChatPdf}
                  aria-label="Print or save conversation as PDF"
                  title="Print / Save as PDF"
                >
                  <Printer size={16} />
                </button>
              </>
            )}
            <button
              className="icon-btn usage-summary-btn"
              type="button"
              onClick={() => setAccountDialog("usage")}
              aria-label="View usage summary"
              title="Usage summary"
            >
              <Activity size={16} />
            </button>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <span className="model-pill">
              <span className="green-dot" /> Gemini <ChevronDown size={13} />
            </span>
            <button
              className="icon-btn help-btn"
              title="About Nexora AI"
              onClick={() =>
                setError(
                  "Nexora AI uses the Gemini API. Your own API key is stored only in your server environment file.",
                )
              }
            >
              <CircleHelp size={17} />
            </button>
          </div>
        </header>
        <section
          className={`conversation ${messages.length ? "has-messages" : ""}`}
          onScroll={(event) => {
            const element = event.currentTarget;
            shouldAutoScrollRef.current =
              element.scrollHeight - element.scrollTop - element.clientHeight < 80;
          }}
        >
          <div className="conversation-inner">
            {loadingChat ? (
              <div className="loading-state">
                <span className="spinner dark-spinner" /> Opening conversation…
              </div>
            ) : messages.length === 0 ? (
              <div className="welcome">
                <div className="welcome-symbol">
                  <div className="symbol-glow" />
                  <Sparkles size={30} />
                </div>
                <div className="eyebrow welcome-eyebrow">
                  <span className="pulse-dot" /> YOUR AI, IN YOUR CORNER
                </div>
                <h1>
                  What would you like to <span>create today?</span>
                </h1>
                <p className="welcome-description">
                  One Workspace. Infinite Possibilities. Explore a tool to get
                  started, or ask Nexora anything. Your conversations stay
                  saved in your workspace.
                </p>
                <div className="starter-grid">
                  {starters.map(({ icon: Icon, title, description, prompt }) => (
                    <button
                      key={title}
                      className="starter-card"
                      onClick={() => {
                        setInput(prompt);
                        inputRef.current?.focus();
                      }}
                    >
                      <span className="starter-icon">
                        <Icon size={18} />
                      </span>
                      <span>
                        <strong>{title}</strong>
                        <small>{description}</small>
                      </span>
                      <ArrowUp size={15} className="starter-arrow" />
                    </button>
                  ))}
                </div>
                <div className="suggestion-note">
                  <Sparkles size={14} /> Your next good idea starts with a
                  question.
                </div>
              </div>
            ) : (
              <div className="message-list">
                {messages.map((message, i) => (
                  <article
                    className={`message-row ${message.role === "user" ? "user-row" : "assistant-row"}`}
                    key={message._id || `${i}-${message.role}`}
                  >
                    <div
                      className={`message-avatar ${message.role === "assistant" ? "ai-avatar" : "user-avatar"}`}
                    >
                      {message.role === "assistant" ? (
                        <Sparkles size={16} />
                      ) : (
                        <UserRound size={16} />
                      )}
                    </div>
                    <div className="message-content">
                      <div className="message-author">
                        {message.role === "assistant"
                          ? "Nexora AI"
                          : session.user?.name || "You"}{" "}
                        <span>
                          {message.role === "assistant"
                            ? "· AI assistant"
                            : "· You"}
                        </span>
                      </div>
                      <div className={`message-text ${message.role === "assistant" ? "assistant-message-text" : ""}`}>
                        {message.role === "assistant" ? (
                          <Suspense fallback={message.content}>
                            <MarkdownContent content={message.content} />
                          </Suspense>
                        ) : (
                          message.content
                        )}
                      </div>
                      <div className="message-footer">
                        {formatMessageTime(message.createdAt) && (
                          <time className="message-time">
                            {formatMessageTime(message.createdAt)}
                          </time>
                        )}
                        {message.role === "assistant" ? (
                          <div className="message-actions">
                          <button
                            onClick={() => copyResponse(message)}
                          >
                            <Check size={13} />
                            {copiedMessageId === String(message._id)
                              ? "Copied"
                              : "Copy response"}
                          </button>
                            {message._id && i === messages.length - 1 && (
                              <button
                                onClick={() =>
                                  sendMessage("", {
                                    regenerateMessageId: message._id,
                                  })
                                }
                              >
                                <RotateCcw size={13} /> Regenerate
                              </button>
                            )}
                          </div>
                        ) : (
                          message._id && (
                            <div className="message-actions">
                              <button
                                onClick={() => {
                                  setEditingMessageId(message._id);
                                  setInput(message.content);
                                  inputRef.current?.focus();
                                }}
                              >
                                <Pencil size={13} /> Edit
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </article>
                ))}
                {busy && (
                  <article className="message-row assistant-row">
                    <div className="message-avatar ai-avatar">
                      <Sparkles size={16} />
                    </div>
                    <div className="message-content">
                      <div className="message-author">
                        Nexora AI <span>· {streamingContent ? "responding" : "thinking"}</span>
                      </div>
                      {streamingContent ? (
                        <div className="message-text assistant-message-text">
                          <Suspense fallback={streamingContent}>
                            <MarkdownContent content={streamingContent} />
                          </Suspense>
                        </div>
                      ) : (
                        <div className="typing-indicator">
                          <i />
                          <i />
                          <i />
                        </div>
                      )}
                    </div>
                  </article>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>
        </section>
        <div className="composer-wrap">
          <div className="composer-inner">
            {error && (
              <div className="alert error composer-error">
                <span>{error}</span>
                {retryAction && (
                  <button
                    className="retry-btn"
                    onClick={retryGeneration}
                    aria-label="Retry response"
                  >
                    <RotateCcw size={14} /> Retry
                  </button>
                )}
                <button onClick={() => setError("")} aria-label="Dismiss error">
                  <X size={15} />
                </button>
              </div>
            )}
            {editingMessageId && (
              <div className="editing-hint">
                <Pencil size={13} /> Editing your message
                <button
                  type="button"
                  onClick={() => {
                    setEditingMessageId(null);
                    setInput("");
                  }}
                  aria-label="Cancel editing"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {(pdfFile || pdfChatMode) && (
              <div className="pdf-attachment-chip">
                <FileText size={14} /> <span>{pdfFile ? pdfFile.name : "PDF attached to this conversation"}</span>
                <button type="button" onClick={() => { setPdfFile(null); setPdfChatMode(false); }} aria-label="Exit PDF chat"><X size={13} /></button>
              </div>
            )}
            <form
              className="composer"
              onSubmit={(e) => {
                e.preventDefault();
                if (pdfFile || pdfChatMode) sendPDFQuestion(input);
                else sendMessage(input, { ...(editingMessageId ? { editMessageId: editingMessageId } : {}) });
              }}
            >
              <textarea
                ref={inputRef}
                rows="1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (pdfFile || pdfChatMode) sendPDFQuestion(input);
                    else sendMessage(input, { ...(editingMessageId ? { editMessageId: editingMessageId } : {}) });
                  }
                }}
                placeholder="Message Nexora AI…"
                aria-label="Message Nexora AI"
              />
              <div className="composer-tools">
                <div className="composer-hint">
                  <span className="keyboard-key">↵</span> to send{" "}
                  <span className="hint-divider">·</span>{" "}
                  <span className="keyboard-key">⇧ ↵</span> new line
                </div>
                {busy && (
                  <button
                    type="button"
                    className="stop-btn"
                    onClick={stopGeneration}
                  >
                    <Square size={12} fill="currentColor" /> Stop generating
                  </button>
                )}
                <input ref={pdfInputRef} type="file" accept="application/pdf,.pdf" hidden onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; if (file.size > 7 * 1024 * 1024) { setError("PDF must be smaller than 7 MB."); event.target.value = ""; return; } setPdfFile(file); setPdfChatMode(true); setError(""); }} />
                <button type="button" className="file-unavailable-btn" aria-label="Attach PDF" title="Attach PDF (max 7 MB)" onClick={() => pdfInputRef.current?.click()}><Paperclip size={16} /></button>
                <button type="button" className="file-unavailable-btn" aria-label="Voice input" aria-pressed={voiceListening} title={voiceListening ? "Stop voice input" : "Speak a message"} onClick={toggleVoiceInput}><Mic size={16} /></button>
                <button type="button" className="file-unavailable-btn" aria-label="Read latest answer aloud" title={hasAssistantMessage ? "Read latest answer aloud" : "A response will be available to read aloud here"} onClick={speakLatestAnswer} disabled={!hasAssistantMessage}><Volume2 size={16} /></button>
                <button
                  type="submit"
                  className="send-btn"
                  disabled={!input.trim() || busy}
                  aria-label="Send message"
                >
                  {busy ? <span className="spinner" /> : <ArrowUp size={18} />}
                </button>
              </div>
            </form>
            <div className="disclaimer">
              <span>
                <Activity size={12} /> Nexora can make mistakes. Check important
                information.
              </span>
              <span>
                Powered by Gemini <Sparkles size={11} />
              </span>
            </div>
          </div>
        </div>
      </main>
      {accountDialog === "account" && (
        <AccountSettings
          token={token}
          user={session.user}
          onUpdated={updateSessionUser}
          onClose={() => setAccountDialog(null)}
        />
      )}
      {accountDialog === "usage" && (
        <UsageSummary
          token={token}
          onClose={() => setAccountDialog(null)}
        />
      )}
    </div>
  );
}

export default App;

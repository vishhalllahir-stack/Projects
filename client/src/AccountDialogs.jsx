import { useEffect, useState } from "react";
import {
  Activity,
  CalendarDays,
  LockKeyhole,
  MessageSquare,
  UserRound,
  X,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "/api";

async function accountRequest(path, token, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false)
    throw new Error(data.message || "Something went wrong.");
  return data;
}

function DialogFrame({ title, description, onClose, children }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="account-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-dialog-title">
        <header className="account-dialog-header">
          <div>
            <span className="account-eyebrow">NEXORA AI WORKSPACE</span>
            <h2 id="account-dialog-title">{title}</h2>
            <p>{description}</p>
          </div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Close dialog">
            <X size={17} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}

export function AccountSettings({ token, user, onUpdated, onClose }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveAccount(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    const payload = { name: name.trim(), email: email.trim() };
    const emailChanged = email.trim().toLowerCase() !== user?.email?.toLowerCase();
    if (currentPassword && (emailChanged || newPassword))
      payload.currentPassword = currentPassword;
    if (newPassword) payload.newPassword = newPassword;
    setSaving(true);
    try {
      const data = await accountRequest("/account/me", token, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      onUpdated(data.user);
      setCurrentPassword("");
      setNewPassword("");
      setNotice("Account details saved.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <DialogFrame
      title="Account settings"
      description="Update your profile and keep your sign-in details secure."
      onClose={onClose}
    >
      <form className="account-form" onSubmit={saveAccount}>
        {error && <div className="alert error">{error}</div>}
        {notice && <div className="alert success">{notice}</div>}
        <label>
          Display name
          <input
            autoFocus
            autoComplete="name"
            maxLength={80}
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Email address
          <input
            autoComplete="email"
            maxLength={254}
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <div className="account-divider">
          <LockKeyhole size={15} /> Change password
        </div>
        <label>
          Current password
          <input
            autoComplete="current-password"
            maxLength={128}
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </label>
        <label>
          New password
          <input
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="At least 8 characters"
          />
        </label>
        <p className="account-hint">
          Your current password is required to change your email or password.
        </p>
        <div className="account-actions">
          <button className="secondary-btn" type="button" onClick={onClose}>
            Close
          </button>
          <button className="primary-btn" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </DialogFrame>
  );
}

export function UsageSummary({ token, onClose }) {
  const [usage, setUsage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    accountRequest("/usage", token)
      .then((data) => {
        if (!cancelled) setUsage(data.usage);
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const stats = usage
    ? [
        { label: "Conversations", value: usage.conversations, icon: MessageSquare },
        { label: "Your prompts", value: usage.userPrompts, icon: UserRound },
        { label: "Nexora replies", value: usage.assistantReplies, icon: Activity },
        { label: "All saved messages", value: usage.messages, icon: LockKeyhole },
        { label: "Messages · last 7 days", value: usage.messagesLast7Days, icon: CalendarDays },
      ]
    : [];

  return (
    <DialogFrame
      title="Usage summary"
      description="A snapshot of activity saved in your Nexora AI workspace."
      onClose={onClose}
    >
      <div className="usage-content">
        {error ? (
          <div className="alert error">{error}</div>
        ) : !usage ? (
          <div className="usage-loading">Loading your usage…</div>
        ) : (
          <>
            <div className="usage-grid">
              {stats.map(({ label, value, icon: Icon }) => (
                <article className="usage-card" key={label}>
                  <span className="usage-card-icon"><Icon size={17} /></span>
                  <strong>{value.toLocaleString()}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <p className="account-hint">
              Counts are based on saved conversations for your account. Gemini token usage,
              quota, and billing data are not available from this app.
            </p>
          </>
        )}
        <div className="account-actions">
          <button className="primary-btn" type="button" onClick={onClose}>Done</button>
        </div>
      </div>
    </DialogFrame>
  );
}

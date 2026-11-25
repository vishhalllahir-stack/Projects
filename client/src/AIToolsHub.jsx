import { useEffect, useState } from "react";
import {
  ArrowRight,
  Code2,
  FileText,
  Globe2,
  LoaderCircle,
  MessageSquare,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import MarkdownContent from "./MarkdownContent.jsx";

const API = import.meta.env.VITE_API_URL || "/api";
const tools = [
  {
    id: "codeAssistant",
    title: "Code Assistant",
    description: "Explain, debug, or draft code without running it.",
    icon: Code2,
    fields: [
      {
        name: "request",
        label: "What do you need?",
        type: "select",
        options: ["Explain", "Debug", "Generate"],
      },
      {
        name: "code",
        label: "Code or requirements",
        type: "textarea",
        placeholder: "Paste code or describe what you want to build…",
      },
    ],
  },
  {
    id: "resumeBuilder",
    title: "Resume Builder",
    description: "Draft resume content from your real background.",
    icon: FileText,
    fields: [
      {
        name: "details",
        label: "Your experience and education",
        type: "textarea",
        placeholder: "Share your roles, projects, education, and skills…",
      },
    ],
  },
  {
    id: "studyPlanner",
    title: "Study Planner",
    description: "Turn your goal and available time into a 7-day plan.",
    icon: WandSparkles,
    fields: [
      { name: "subject", label: "Subject", placeholder: "e.g. JavaScript" },
      { name: "goal", label: "Your goal", placeholder: "e.g. Build a small app" },
      {
        name: "hoursPerWeek",
        label: "Hours per week (1–80)",
        type: "number",
        min: 1,
        max: 80,
        placeholder: "7",
      },
    ],
  },
  {
    id: "contentWriter",
    title: "Content Writer",
    description: "Create drafts with a chosen tone and length.",
    icon: FileText,
    fields: [
      {
        name: "topic",
        label: "Topic and key details",
        type: "textarea",
        placeholder: "What should the content cover?",
      },
      {
        name: "tone",
        label: "Tone",
        type: "select",
        options: ["Professional", "Friendly", "Persuasive", "Playful"],
      },
      {
        name: "length",
        label: "Length",
        type: "select",
        options: ["Short", "Medium", "Long"],
      },
    ],
  },
  {
    id: "translationAssistant",
    title: "Translation Assistant",
    description: "Translate text while retaining its tone and layout.",
    icon: Globe2,
    fields: [
      {
        name: "targetLanguage",
        label: "Translate to",
        placeholder: "e.g. French",
      },
      {
        name: "text",
        label: "Text to translate",
        type: "textarea",
        placeholder: "Paste the text to translate…",
      },
    ],
  },
  {
    id: "projectIdeas",
    title: "Project Ideas",
    description: "Get scoped project ideas and implementation milestones.",
    icon: Zap,
    fields: [
      {
        name: "skillLevel",
        label: "Skill level",
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced"],
      },
      {
        name: "technologies",
        label: "Technologies",
        placeholder: "e.g. React, Node.js, MongoDB",
      },
    ],
  },
];

export default function AIToolsHub({ token, onClose, onContinueInChat }) {
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [values, setValues] = useState({});
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy result");

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && !busy) onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [busy, onClose]);

  function selectTool(tool) {
    setSelectedTool(tool);
    setValues({});
    setResult("");
    setError("");
  }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setResult("");
    try {
      const response = await fetch(`${API}/tools/${selectedTool.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ input: values }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false)
        throw new Error(data.message || "Could not generate this result.");
      if (typeof data.result !== "string" || !data.result.trim())
        throw new Error("The AI returned an empty result. Please try again.");
      setResult(data.result);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(result);
      setCopyLabel("Copied");
    } catch {
      setCopyLabel("Copy failed");
    }
    window.setTimeout(() => setCopyLabel("Copy result"), 1800);
  }

  function continueInChat() {
    const originalRequest = Object.entries(values)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    const output = result.length > 6000
      ? `${result.slice(0, 6000)}\n\n[The result was shortened to fit in the chat prompt.]`
      : result;
    onContinueInChat(
      `Continue refining this ${selectedTool.title} result.\n\nMy request:\n${originalRequest}\n\nGenerated result:\n${output}`,
    );
  }

  return (
    <div
      className="tools-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      <section
        className="tools-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tools-title"
      >
        <header className="tools-header">
          <div>
            <span className="tools-eyebrow">NOVA WORKSPACE</span>
            <h2 id="tools-title">AI tools</h2>
            <p>Choose a tool and provide the details for a tailored result.</p>
          </div>
          <button
            className="icon-btn"
            type="button"
            onClick={onClose}
            aria-label="Close AI tools"
            disabled={busy}
          >
            <X size={18} />
          </button>
        </header>

        <div className="tools-layout">
          <nav className="tools-list" aria-label="AI tools">
            {tools.map(({ icon: Icon, ...tool }) => (
              <button
                className={`tool-option ${selectedTool.id === tool.id ? "selected" : ""}`}
                key={tool.id}
                type="button"
                onClick={() => selectTool({ ...tool, icon: Icon })}
                disabled={busy}
              >
                <Icon size={17} />
                <span>{tool.title}</span>
              </button>
            ))}
          </nav>

          <div className="tool-workspace">
            <div className="tool-intro">
              <span className="tool-icon">
                <selectedTool.icon size={20} />
              </span>
              <div>
                <h3>{selectedTool.title}</h3>
                <p>{selectedTool.description}</p>
              </div>
            </div>
            <form className="tool-form" onSubmit={submit}>
              {selectedTool.fields.map((field) => (
                <label key={field.name}>
                  <span>{field.label}</span>
                  {field.type === "textarea" ? (
                    <textarea
                      required
                      maxLength={8000}
                      value={values[field.name] || ""}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.name]: event.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                    />
                  ) : field.type === "select" ? (
                    <select
                      required
                      value={values[field.name] || ""}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.name]: event.target.value,
                        }))
                      }
                    >
                      <option value="" disabled>
                        Choose an option
                      </option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      required
                      maxLength={8000}
                      type={field.type || "text"}
                      min={field.min}
                      max={field.max}
                      value={values[field.name] || ""}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.name]: event.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                    />
                  )}
                </label>
              ))}
              {error && <div className="alert error">{error}</div>}
              <button className="primary-btn tool-submit" disabled={busy}>
                {busy ? (
                  <>
                    <LoaderCircle className="tool-spinner" size={16} />
                    Generating with Gemini…
                  </>
                ) : (
                  <>
                    Generate result <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {result && (
              <section className="tool-result" aria-live="polite">
                <div className="tool-result-header">
                  <h3>Generated result</h3>
                  <button type="button" onClick={copyResult}>
                    {copyLabel}
                  </button>
                </div>
                <div className="tool-result-content assistant-message-text">
                  <MarkdownContent content={result} />
                </div>
                <button
                  className="tool-continue"
                  type="button"
                  onClick={continueInChat}
                >
                  Continue in chat <MessageSquare size={15} />
                </button>
              </section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

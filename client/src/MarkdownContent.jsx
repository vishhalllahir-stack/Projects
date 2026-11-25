import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import jsonLanguage from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import cssLanguage from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import java from "highlight.js/lib/languages/java";

const codeHighlight = [
  rehypeHighlight,
  {
    languages: {
      javascript,
      typescript,
      python,
      json: jsonLanguage,
      bash,
      css: cssLanguage,
      xml,
      java,
    },
    aliases: {
      javascript: ["js", "jsx"],
      typescript: ["ts", "tsx"],
      python: ["py"],
      bash: ["sh", "shell"],
      xml: ["html"],
    },
  },
];

function getTextContent(node) {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (node?.props?.children) return getTextContent(node.props.children);
  return "";
}

function MarkdownCodeBlock({ children, ...props }) {
  const [copyLabel, setCopyLabel] = useState("Copy code");

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(
        getTextContent(children).replace(/\n$/, ""),
      );
      setCopyLabel("Copied");
    } catch {
      setCopyLabel("Copy failed");
    }
    window.setTimeout(() => setCopyLabel("Copy code"), 1800);
  }

  return (
    <div className="code-block">
      <button
        className="copy-code-btn"
        type="button"
        onClick={copyCode}
        aria-label={copyLabel}
      >
        {copyLabel}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  );
}

export default function MarkdownContent({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[codeHighlight]}
      components={{ pre: MarkdownCodeBlock }}
    >
      {content}
    </ReactMarkdown>
  );
}

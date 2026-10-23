import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const Message = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  return (
    <div
      className={`group relative max-w-3xl rounded-2xl p-4 ${
        message.role === "user"
          ? "ml-auto bg-[#39FF88] whitespace-pre-wrap text-[#041008] shadow-[0_0_20px_rgba(57,255,136,0.25)]"
          : "border border-gray-200 bg-gray-100 text-gray-900 dark:border-[#1C2B22] dark:bg-[#0A100D] dark:text-white"
      }`}
    >
      {message.role === "assistant" && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Message copied" : "Copy message"}
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-md bg-gray-200 p-2 text-gray-500 opacity-100 transition hover:text-[#39FF88] sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 dark:bg-[#1C2B22] dark:text-gray-300"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied && <span className="text-xs">Copied</span>}
        </button>
      )}

      {message.role === "assistant" ? (
        <div className="prose prose-sm dark:prose-invert prose-pre:p-0 max-w-none pr-8 break-words">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre({ children }) {
                const codeElement = children?.props;
                const className = codeElement?.className || "";
                const match = /language-([\w-]+)/.exec(className);
                const language = match?.[1] || "text";
                const code = String(codeElement?.children ?? "");

                return (
                  <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    PreTag="pre"
                    customStyle={{
                      borderRadius: "14px",
                      padding: "18px",
                      marginTop: "12px",
                      marginBottom: "12px",
                      background: "#050807",
                      border: "1px solid #1C2B22",
                      fontSize: "14px",
                      lineHeight: "1.7",
                      overflowX: "auto",
                      textShadow: "none",
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                        textShadow: "none",
                      },
                    }}
                  >
                    {code.replace(/\n$/, "")}
                  </SyntaxHighlighter>
                );
              },

              code({ className, children, ...props }) {
                return (
                  <code
                    className={
                      className ||
                      "rounded-md bg-green-100 px-1.5 py-0.5 font-mono text-sm text-green-700 dark:bg-[#102A1C] dark:text-green-300"
                    }
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="text-sm leading-relaxed">{message.content}</div>
      )}
    </div>
  );
};

export default Message;

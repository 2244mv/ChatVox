import { useState, useRef, useEffect, useCallback } from "react";
import { useChat } from "../hooks/useChat";
import { Send } from "lucide-react";
import Message from "../components/chat/Message";
import FeatureCards from "../components/home/FeatureCards";

const Chat = () => {
  const { activeChat, sendMessage, loading, stopGenerating } = useChat();

  const [input, setInput] = useState("");

  const chatContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  // const previousMessageCountRef = useRef(0);

  // Scroll only the chat messages container.
  const scrollToBottom = useCallback((behavior = "smooth") => {
    const container = chatContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  }, []);

  const handleSend = async () => {
    const message = input.trim();

    if (!message) return;

    setInput("");

    // Show the newly sent message immediately.
    requestAnimationFrame(() => {
      scrollToBottom("smooth");
    });

    await sendMessage(message);

    // Keep focus on the input when the request completes.
    inputRef.current?.focus({ preventScroll: true });
  };

  // Scroll when messages change or AI generation starts/stops.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      scrollToBottom("smooth");
    });

    return () => cancelAnimationFrame(frame);
  }, [activeChat?.messages, loading, scrollToBottom]);

  // Handle mobile keyboard and visual viewport resizing.
  useEffect(() => {
    const viewport = window.visualViewport;
    const container = chatContainerRef.current;

    if (!viewport || !container) return;

    const updateViewport = () => {
      const appElement = container.parentElement;

      if (!appElement) return;

      const rect = appElement.getBoundingClientRect();
      const visibleBottom = viewport.offsetTop + viewport.height;
      const visibleHeight = Math.max(0, visibleBottom - rect.top);

      appElement.style.setProperty(
        "--chat-visible-height",
        `${visibleHeight}px`,
      );
    };

    viewport.addEventListener("resize", updateViewport);
    viewport.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);

    updateViewport();

    return () => {
      viewport.removeEventListener("resize", updateViewport);
      viewport.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const handleFeatureAction = (action) => {
    const prompts = {
      writing:
        "Help me write a clear, polished, professional message. Ask what details you need.",
      ideas:
        "Help me brainstorm a few creative and practical ideas for my goal.",
      learn:
        "Teach me a topic step by step using simple language and examples.",
      plan: "Help me turn my goal into a practical step-by-step plan.",
    };

    sendMessage(prompts[action] || "Hello");
  };

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden"
      style={{
        height: "var(--chat-visible-height, 100%)",
      }}
    >
      {/* CHAT MESSAGES */}

      <div
        ref={chatContainerRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6"
        style={{
          WebkitOverflowScrolling: "touch",
          overflowAnchor: "auto",
        }}
      >
        <div className="mx-auto w-full max-w-3xl space-y-6">
          {!activeChat?.messages?.length ? (
            <FeatureCards onAction={handleFeatureAction} />
          ) : (
            activeChat.messages.map((msg, i) => (
              <Message key={i} message={msg} />
            ))
          )}

          {loading && (
            <div className="animate-pulse text-center text-gray-400 dark:text-gray-500">
              AI is typing...
              <button
                onClick={stopGenerating}
                className="ml-3 text-red-500 underline hover:text-red-400"
              >
                Stop
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* MESSAGE INPUT */}

      <div className="flex shrink-0 gap-2 border-t border-gray-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-[#1C2B22] dark:bg-[#050807] sm:p-4">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Message ChatVox…"
          className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#39FF88] focus:outline-none dark:border-[#1C2B22] dark:bg-[#0A100D] dark:text-white"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          aria-label="Send message"
          className="flex shrink-0 items-center justify-center rounded-xl bg-[#39FF88] px-4 text-[#041008] transition hover:bg-[#20D96B] hover:shadow-[0_0_25px_rgba(57,255,136,0.5)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chat;

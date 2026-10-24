import { useState, useRef, useEffect, useCallback } from "react";
import { useChat } from "../hooks/useChat";
import { Send } from "lucide-react";
import Message from "../components/chat/Message";
import FeatureCards from "../components/home/FeatureCards";

const Chat = () => {
  const { activeChat, sendMessage, loading, stopGenerating } = useChat();

  const [input, setInput] = useState("");

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);

  const scrollToBottom = useCallback((behavior = "auto") => {
    const container = chatContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  }, []);

  useEffect(() => {
    if (!shouldAutoScrollRef.current) return;

    const frame = requestAnimationFrame(() => {
      scrollToBottom("auto");
    });

    return () => cancelAnimationFrame(frame);
  }, [activeChat?.messages, loading, scrollToBottom]);

  useEffect(() => {
    const viewport = window.visualViewport;

    const handleViewportChange = () => {
      if (!shouldAutoScrollRef.current) return;

      requestAnimationFrame(() => {
        scrollToBottom("auto");
      });
    };

    viewport?.addEventListener("resize", handleViewportChange);

    return () => {
      viewport?.removeEventListener("resize", handleViewportChange);
    };
  }, [scrollToBottom]);

  const handleSend = async () => {
    const message = input.trim();

    if (!message || loading) return;

    shouldAutoScrollRef.current = true;
    setInput("");

    try {
      await sendMessage(message);
    } finally {
      inputRef.current?.focus();
    }
  };

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

    shouldAutoScrollRef.current = true;
    sendMessage(prompts[action] || "Hello");
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {/* CHAT MESSAGES */}
      <div
        ref={chatContainerRef}
        onScroll={(event) => {
          const container = event.currentTarget;

          const distanceFromBottom =
            container.scrollHeight -
            container.scrollTop -
            container.clientHeight;

          shouldAutoScrollRef.current = distanceFromBottom < 120;
        }}
        className="min-h-0 flex-1 overscroll-contain overflow-x-hidden overflow-y-auto px-4 py-6"
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
        </div>
      </div>

      {/* MESSAGE INPUT */}
      <div className="flex shrink-0 items-center gap-2 border-t border-gray-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-[#1C2B22] dark:bg-[#050807] sm:p-4">
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onFocus={() => {
            shouldAutoScrollRef.current = true;
            requestAnimationFrame(() => scrollToBottom("auto"));
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          placeholder="Message ChatVox…"
          className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#39FF88] dark:border-[#1C2B22] dark:bg-[#0A100D] dark:text-white"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#39FF88] text-[#041008] transition hover:bg-[#20D96B] hover:shadow-[0_0_25px_rgba(57,255,136,0.5)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
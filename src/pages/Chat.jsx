import { useState, useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { Send } from "lucide-react";
import Message from "../components/chat/Message";
import FeatureCards from "../components/home/FeatureCards";

const Chat = () => {
  const { activeChat, sendMessage, loading, stopGenerating } = useChat();

  const [input, setInput] = useState("");

  const bottomRef = useRef(null);

  const inputRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const message = input;

    setInput("");

    await sendMessage(message);

    inputRef.current?.focus();
  };

  // AUTO SCROLL
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
  }, [activeChat?.messages, loading]);

  const handleFeatureAction = (action) => {
    const prompts = {
      writing: "Help me write a clear, polished, professional message. Ask what details you need.",
      ideas: "Help me brainstorm a few creative and practical ideas for my goal.",
      learn: "Teach me a topic step by step using simple language and examples.",
      plan: "Help me turn my goal into a practical step-by-step plan.",
    };

    sendMessage(prompts[action] || "Hello");
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* CHAT AREA */}

      <div className="flex-1 overflow-y-auto px-4 py-6">
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

      {/* INPUT AREA */}

      <div className="flex gap-2 border-t border-gray-200 bg-white p-4 dark:border-[#1C2B22] dark:bg-[#050807]">
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
          className="flex-1 rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#39FF88] focus:outline-none dark:border-[#1C2B22] dark:bg-[#0A100D] dark:text-white"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="flex items-center justify-center rounded-xl bg-[#39FF88] px-4 text-[#041008] transition hover:bg-[#20D96B] hover:shadow-[0_0_25px_rgba(57,255,136,0.5)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chat;

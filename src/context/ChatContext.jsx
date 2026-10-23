import { createContext, useRef, useState } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { streamMessageToAI } from "../api/ai";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useLocalStorage("chats", []);

  const [activeChatId, setActiveChatId] = useState(null);

  const [loading, setLoading] = useState(false);

  const controllerRef = useRef(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // CREATE CHAT

  const createChat = (firstMessage = "") => {
    const newChat = {
      id: Date.now().toString(),

      title: firstMessage ? firstMessage.slice(0, 20) : "New Chat",

      messages: [],

      updatedAt: Date.now(),
    };

    const updated = [newChat, ...chats].slice(0, 5);

    setChats(updated);

    setActiveChatId(newChat.id);

    return newChat;
  };

  // SEND MESSAGE

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    let chat = activeChat;

    if (!chat) {
      chat = createChat(text);
    }

    const userMessage = {
      role: "user",

      content: text,
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === chat.id
          ? {
              ...c,

              title: c.title === "New Chat" ? text.slice(0, 20) : c.title,

              messages: [...c.messages, userMessage],

              updatedAt: Date.now(),
            }
          : c,
      ),
    );

    const safeMessages = [
      ...(chat.messages || []).map((m) => ({
        role: m.role,
        content: m.content,
      })),

      userMessage,
    ];

    setLoading(true);

    controllerRef.current = new AbortController();

    try {
      await streamMessageToAI(
        safeMessages,

        (streamText) => {
          setChats((prev) =>
            prev.map((c) => {
              if (c.id !== chat.id) return c;

              const messages = [...c.messages];

              const lastIndex = messages.length - 1;

              if (messages[lastIndex]?.role === "assistant") {
                messages[lastIndex] = {
                  ...messages[lastIndex],

                  content: streamText,
                };
              } else {
                messages.push({
                  role: "assistant",

                  content: streamText,
                });
              }

              return {
                ...c,

                messages,

                updatedAt: Date.now(),
              };
            }),
          );
        },

        controllerRef.current.signal,
      );
    } catch (err) {
      console.log("Stream error:", err.message);
    }

    setLoading(false);
  };

  // STOP GENERATION

  const stopGenerating = () => {
    controllerRef.current?.abort();

    setLoading(false);
  };

  // DELETE SINGLE CHAT

  const deleteChat = (id) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));

    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  // CLEAR ALL CHATS

  const clearAllChats = () => {
    setChats([]);

    setActiveChatId(null);
  };

  return (
    <ChatContext.Provider
      value={{
        chats,

        activeChatId,

        setActiveChatId,

        activeChat,

        sendMessage,

        loading,

        stopGenerating,

        deleteChat,

        createChat,

        clearAllChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

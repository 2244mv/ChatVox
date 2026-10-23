import { useState } from "react";
import {
  Plus,
  MessageSquare,
  Trash2,
  Search,
  Home,
  Sparkles,
  Settings,
  Mic,
  AudioWaveform,
} from "lucide-react";

import { NavLink } from "react-router";

import { useChat } from "../../hooks/useChat";
import { ROUTES } from "../../routes/router";

const Sidebar = () => {
  const { chats, setActiveChatId, activeChatId, deleteChat, createChat } =
    useChat();

  const [query, setQuery] = useState("");

  const filtered = chats.filter((chat) =>
    chat.title.toLowerCase().includes(query.toLowerCase()),
  );

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 font-medium transition ${
      isActive
        ? "bg-[#39FF88] text-[#041008] shadow-[0_0_25px_rgba(57,255,136,0.45)]"
        : "hover:bg-[#39FF88] hover:text-[#041008] hover:shadow-[0_0_25px_rgba(57,255,136,0.45)]"
    }`;

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white text-gray-900 dark:border-[#1C2B22] dark:bg-[#050807] dark:text-white">
      {/* Header */}

      <div className="flex h-[76px] items-center gap-3 border-b border-gray-200 px-4 dark:border-[#1C2B22]">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#39FF88] text-[#041008] shadow-[0_0_24px_rgba(57,255,136,0.22)]">
          <AudioWaveform size={22} strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className="font-bold tracking-tight">ChatVox</p>
          <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">Your voice & chat companion</p>
        </div>
      </div>

      {/* New Chat */}

      <div className="p-3">
        <button
          onClick={() => createChat("")}
          className="flex w-full items-center gap-2 rounded-xl bg-[#39FF88] px-3 py-2.5 font-semibold text-[#041008] transition hover:bg-[#20D96B] hover:shadow-[0_0_25px_rgba(57,255,136,0.45)]"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* History */}

      <div className="flex-1 space-y-1 overflow-y-auto px-2">
        {filtered.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition ${
              chat.id === activeChatId
                ? "bg-[#102A1C] text-green-300"
                : "hover:bg-gray-100 dark:hover:bg-[#0A100D]"
            }`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <MessageSquare size={16} />

              <span className="truncate text-sm">
                {chat.title || "New Chat"}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();

                deleteChat(chat.id);
              }}
              className="text-red-500 opacity-0 transition group-hover:opacity-100 hover:text-red-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Search */}

      <div className="border-t border-gray-200 p-3 dark:border-[#1C2B22]">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-100 px-3 py-2 dark:border-[#1C2B22] dark:bg-[#0A100D]">
          <Search size={16} />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* Navigation */}

      <div className="space-y-2 border-t border-gray-200 p-3 dark:border-[#1C2B22]">
        <NavLink to={ROUTES.HOME} className={navClass}>
          <Home size={18} />
          Home
        </NavLink>

        <NavLink to={ROUTES.VOICE} className={navClass}>
          <Mic size={18} />
          Voice Mode
        </NavLink>

        <NavLink to={ROUTES.FEATURES} className={navClass}>
          <Sparkles size={18} />
          Features
        </NavLink>

        <NavLink to={ROUTES.SETTINGS} className={navClass}>
          <Settings size={18} />
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;

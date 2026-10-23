import { useContext, useState } from "react";

import {
  Palette,
  Bot,
  Mic,
  MessageSquare,
  Trash2,
  Sparkles,
} from "lucide-react";

import { useChat } from "../hooks/useChat";
import { AI_FEATURES } from "../config/features";
import { ThemeContext } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext";

const Settings = () => {
  const { clearAllChats } = useChat();

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { settings, setSettings } = useSettings();

  const [showToast, setShowToast] = useState(false);

  const handleClearChats = () => {
    clearAllChats();

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <div className="relative h-full overflow-y-auto bg-[#f7f7f8] p-5 text-gray-900 dark:bg-[#050807] dark:text-white">
      {/* Toast */}

      {showToast && (
        <div className="fixed top-5 right-5 z-50 rounded-xl border border-[#39FF88] bg-[#0A100D] px-5 py-3 text-sm text-white shadow-[0_0_25px_rgba(57,255,136,0.5)]">
          ✅ All chats cleared successfully
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-[#39FF88]/20 p-3 text-[#39FF88] shadow-[0_0_25px_rgba(57,255,136,0.35)]">
            <Sparkles size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Settings</h1>

            <p className="text-gray-500 dark:text-gray-400">
              Customize your AI assistant experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Appearance */}

          <SettingCard
            icon={Palette}
            title="Appearance"
            description="Customize interface theme"
          >
            <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3 dark:bg-[#050807]">
              <span className="text-sm">Theme</span>

              <button
                onClick={toggleTheme}
                className="rounded-xl bg-[#39FF88] px-4 py-1.5 text-sm font-medium text-[#041008] transition hover:shadow-[0_0_20px_rgba(57,255,136,0.5)]"
              >
                {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
              </button>
            </div>

            <SettingRow label="Interface" value="AI Cyber Style" />
          </SettingCard>

          {/* AI Preferences */}

          <SettingCard
            icon={Bot}
            title="AI Preferences"
            description="Manage AI response settings"
          >
            <SettingRow label="AI Model" value="Groq · GPT-OSS 20B" />

            <SettingRow label="Response Style" value="Detailed" />
          </SettingCard>

          {/* Voice */}

          <SettingCard
            icon={Mic}
            title="Voice Settings"
            description="Voice assistant controls"
          >
            <div className="space-y-4 rounded-xl bg-gray-100 p-4 dark:bg-[#050807]">
              <label className="block text-sm">
                <span className="mb-2 block text-gray-600 dark:text-gray-400">Speech language</span>
                <select value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-[#39FF88] dark:border-[#1C2B22] dark:bg-[#0A100D] dark:text-white">
                  <option value="en-US">English (US)</option>
                  <option value="hi-IN">Hindi (India)</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-gray-600 dark:text-gray-400">Speech speed · {Number(settings.speed).toFixed(1)}x</span>
                <input type="range" min="0.8" max="1.2" step="0.1" value={settings.speed} onChange={(e) => setSettings({ ...settings, speed: Number(e.target.value) })} className="w-full accent-[#39FF88]" />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-gray-600 dark:text-gray-400">AI personality</span>
                <select value={settings.personality} onChange={(e) => setSettings({ ...settings, personality: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-[#39FF88] dark:border-[#1C2B22] dark:bg-[#0A100D] dark:text-white">
                  <option value="friendly">Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="creative">Creative</option>
                </select>
              </label>
            </div>
          </SettingCard>

          {/* Chat */}

          <SettingCard
            icon={MessageSquare}
            title="Chat Settings"
            description="Manage conversations"
          >
            <SettingRow label="Save History" value="Enabled" />

            <SettingRow label="Maximum Chats" value="5 Chats" />
          </SettingCard>

          {/* AI Capabilities */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-2 dark:border-[#1C2B22] dark:bg-[#0A100D]">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-[#39FF88]/20 p-3 text-[#39FF88]">
                <Sparkles size={22} />
              </div>

              <div>
                <h2 className="font-semibold">AI Capabilities</h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upcoming AI features
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {AI_FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  className="rounded-xl border border-gray-200 bg-gray-100 p-4 dark:border-[#1C2B22] dark:bg-[#050807]"
                >
                  <h3 className="font-medium">{feature.title}</h3>

                  <p className="mt-1 text-xs text-[#39FF88]">Coming Soon</p>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}

          <div className="rounded-2xl border border-red-500/30 bg-white p-5 dark:bg-[#0A100D]">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-500/20 p-3 text-red-500">
                <Trash2 size={22} />
              </div>

              <div>
                <h2 className="font-semibold">Danger Zone</h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your stored chats
                </p>
              </div>
            </div>

            <button
              onClick={handleClearChats}
              className="mt-5 w-full rounded-xl bg-red-500 py-2 font-medium text-white transition hover:bg-red-600"
            >
              Clear All Chats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingCard = ({ icon: Icon, title, description, children }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-[#39FF88] hover:shadow-[0_0_25px_rgba(57,255,136,0.25)] dark:border-[#1C2B22] dark:bg-[#0A100D]">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-[#39FF88]/20 p-3 text-[#39FF88]">
          <Icon size={22} />
        </div>

        <div>
          <h2 className="font-semibold">{title}</h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
};

const SettingRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3 dark:bg-[#050807]">
      <span className="text-sm">{label}</span>

      <span className="text-sm text-[#39FF88]">{value}</span>
    </div>
  );
};

export default Settings;

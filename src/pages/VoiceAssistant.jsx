import { Link } from "react-router";
import { MessageSquare, Settings2 } from "lucide-react";
import AIOrb from "../components/orb/AIOrb";
import Waveform from "../components/voice/Waveform";
import VoiceButton from "../components/voice/VoiceButton";
import StopButton from "../components/voice/StopButton";
import StatusText from "../components/ui/StatusText";
import ErrorMessage from "../components/ui/ErrorMessage";
import { ROUTES } from "../routes/router";

const VoiceAssistant = () => {
  return (
    <section className="relative h-full min-h-0 w-full overflow-hidden bg-[#f7f7f8] text-gray-900 transition-colors duration-200 dark:bg-[#050807] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(57,255,136,0.16),transparent_48%)] dark:bg-[radial-gradient(circle_at_50%_42%,rgba(57,255,136,0.13),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] bg-[linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-size-[42px_42px] dark:opacity-[0.12] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
      <ErrorMessage />
      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col items-center justify-center gap-1 px-3 py-2 sm:gap-2 sm:px-6 sm:py-3 lg:gap-3">
        <div className="flex w-full max-w-2xl items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-green-700 sm:text-xs sm:tracking-[0.4em] dark:text-[#39FF88]/80">CHATVOX VOICE</p>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm dark:text-white/50">Speak naturally. Chat instantly.</p>
          </div>
          <Link to={ROUTES.SETTINGS} aria-label="Voice settings" title="Voice settings" className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-700/20 bg-white/70 text-green-700 transition hover:bg-green-100 sm:h-10 sm:w-10 dark:border-[#39FF88]/20 dark:bg-white/[0.04] dark:text-[#39FF88] dark:hover:bg-[#39FF88]/10">
            <Settings2 size={18} />
          </Link>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <div className="pointer-events-none absolute h-40 w-40 rounded-full bg-[#39FF88] opacity-20 blur-[70px] sm:h-64 sm:w-64 sm:blur-[100px]" />
          <AIOrb />
        </div>
        <div className="flex w-full max-w-md flex-col items-center gap-1.5 sm:gap-2">
          <Waveform />
          <StatusText />
          <div className="mt-1 flex items-center justify-center gap-5 sm:mt-2 sm:gap-6">
            <VoiceButton />
            <StopButton />
          </div>
          <p className="max-w-sm px-2 text-center text-[10px] leading-4 text-gray-500 sm:text-xs sm:leading-5">Tap the microphone and speak. For the best experience, allow microphone access.</p>
          <Link to={ROUTES.HOME} className="mt-1 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-gray-600 transition hover:bg-green-100 hover:text-green-700 sm:mt-2 sm:text-sm dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-[#39FF88]">
            <MessageSquare size={14} /> Back to Chat
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VoiceAssistant;

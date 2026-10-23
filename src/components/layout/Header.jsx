import { ArrowLeft, Menu, AudioWaveform } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSidebar } from "../../hooks/useSidebar";
import ThemeToggle from "../common/ThemeToggle";
import { ROUTES } from "../../routes/router";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const isVoice = location.pathname === ROUTES.VOICE;

  return (
    <header className="relative z-20 flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white/95 px-3 backdrop-blur-xl dark:border-[#1C2B22] dark:bg-[#050807]/95 sm:px-5">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {isVoice ? (
          <button onClick={() => navigate(-1)} aria-label="Go back" title="Go back" className="rounded-xl p-2 transition hover:bg-[#102A1C] hover:text-[#39FF88]">
            <ArrowLeft size={20} />
          </button>
        ) : (
          <button onClick={toggleSidebar} aria-label="Open navigation" className="rounded-xl p-2 transition hover:bg-[#102A1C] hover:text-[#39FF88] md:hidden">
            <Menu size={20} />
          </button>
        )}
        <Link to={ROUTES.HOME} className="flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-none">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#39FF88] text-[#041008] shadow-[0_0_18px_rgba(57,255,136,0.2)]">
            <AudioWaveform size={18} strokeWidth={2.5} />
          </span>
          <span className="truncate text-base font-bold tracking-tight sm:text-lg">ChatVox</span>
        </Link>
      </div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;

import { X } from "lucide-react";
import { useSidebar } from "../../hooks/useSidebar";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-hidden bg-white transition-transform duration-300 md:hidden dark:bg-[#050807] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          height: "var(--app-height, 100dvh)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <button
          onClick={toggleSidebar}
          aria-label="Close sidebar"
          className="absolute right-3 top-3 z-50 rounded-xl p-2 transition hover:bg-[#39FF88] hover:text-[#041008]"
        >
          <X size={20} />
        </button>

        <div className="h-full min-h-0 flex-1 overflow-hidden">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;

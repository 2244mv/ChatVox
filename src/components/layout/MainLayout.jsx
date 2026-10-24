import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";
import MobileBottomNav from "./MobileBottomNav";

const MainLayout = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      const viewport = window.visualViewport;
      const visibleHeight = viewport?.height ?? window.innerHeight;

      document.documentElement.style.setProperty(
        "--app-height",
        `${visibleHeight}px`,
      );

      setKeyboardOpen(window.innerHeight - visibleHeight > 120);
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);
    window.visualViewport?.addEventListener("resize", updateViewport);
    window.visualViewport?.addEventListener("scroll", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.visualViewport?.removeEventListener("resize", updateViewport);
      window.visualViewport?.removeEventListener("scroll", updateViewport);
      document.documentElement.style.removeProperty("--app-height");
    };
  }, []);

  return (
    <main
      className="relative flex min-h-0 w-full overflow-hidden bg-[#f7f7f8] text-gray-900 dark:bg-[#050807] dark:text-white"
      style={{ height: "var(--app-height, 100dvh)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,136,0.07),transparent_45%)]" />

      <div className="relative z-10 flex h-full min-h-0 w-full">
        <aside className="hidden h-full shrink-0 md:block">
          <Sidebar />
        </aside>

        <MobileSidebar />

        <section className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Header />

          <div
            className={`min-h-0 flex-1 overflow-hidden ${
              keyboardOpen ? "pb-0" : "pb-14 md:pb-0"
            }`}
          >
            <Outlet />
          </div>

          <MobileBottomNav keyboardOpen={keyboardOpen} />
        </section>
      </div>
    </main>
  );
};

export default MainLayout;
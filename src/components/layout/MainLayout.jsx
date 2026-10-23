import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";
import MobileBottomNav from "./MobileBottomNav";

const MainLayout = () => {
  return (
    <main className="relative flex h-dvh min-h-0 w-full overflow-hidden bg-[#f7f7f8] text-gray-900 dark:bg-[#050807] dark:text-white">
      {/* Subtle background glow; keep it behind the actual application UI. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,136,0.07),transparent_45%)]" />

      <div className="relative z-10 flex h-full min-h-0 w-full">
        <aside className="hidden h-full shrink-0 md:block">
          <Sidebar />
        </aside>

        <MobileSidebar />

        <section className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Header />
          <div className="min-h-0 flex-1 overflow-hidden pb-14 md:pb-0">
            <Outlet />
          </div>
          <MobileBottomNav />
        </section>
      </div>
    </main>
  );
};

export default MainLayout;

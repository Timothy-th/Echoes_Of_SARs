import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useTheme } from "../../context/ThemeProvider";

const DashboardLayout = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`flex min-h-screen w-full overflow-x-hidden transition-colors duration-300 ${
        isDark ? "bg-[#0B1220] text-slate-100" : "bg-[#F5F7F2] text-slate-800"
      }`}
    >
      {/* Desktop Sidebar */}
      <div className="hidden shrink-0 lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar overlay"
            className="absolute inset-0 h-full w-full bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />

          <div className="relative z-10 h-full w-64 max-w-[85vw] shadow-2xl">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className={`absolute right-3 top-3 z-20 rounded-lg p-2 shadow-md ${
                isDark ? "bg-slate-800 text-white" : "bg-white text-slate-800"
              }`}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>

            <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <div className="flex min-w-0 items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`ml-3 shrink-0 rounded-lg p-2 lg:hidden ${
              isDark
                ? "bg-slate-800 text-white"
                : "bg-white text-slate-800 shadow-sm"
            }`}
            aria-label="Open navigation menu"
          >
            <Menu size={21} />
          </button>

          <div className="min-w-0 flex-1">
            <Topbar />
          </div>
        </div>

        {/* Page Content */}
        <main
          className={`min-w-0 flex-1 p-3 transition-colors duration-300 sm:p-5 md:p-6 lg:p-8 ${
            isDark ? "bg-[#0B1220]" : "bg-[#F5F7F2]"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useTheme } from "../../context/ThemeProvider";

const DashboardLayout = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#0B1220] text-slate-100" : "bg-[#F5F7F2] text-slate-800"
      }`}
    >
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main
          className={`flex-1 overflow-y-auto p-8 transition-colors duration-300 ${
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

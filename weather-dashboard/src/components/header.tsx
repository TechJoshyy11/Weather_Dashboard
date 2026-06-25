import { useTheme } from "../context/theme-provider";
import { Link } from "react-router-dom";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import CitySearch from "./city-search";

const header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background-blur py-2 supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <div className="flex gap-3 items-center">
            <img
              src={isDark ? "/logo1.png" : "logo2.png"}
              alt="Klimate Logo"
              className="h-14"
            />
            <div className="flex flex-col">
              <h1 className="uppercase">Weather</h1>
              <span className="text-xs uppercase text-gray-500">Dashboard</span>
            </div>
          </div>
        </Link>

        <div className="flex gap-4">
          <CitySearch />
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default header;

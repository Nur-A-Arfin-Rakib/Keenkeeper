import { NavLink } from "react-router-dom";
import { Home, Clock, BarChart2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1a3c2e] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-[#1a3c2e] font-bold text-xl tracking-tight">
              KeenKeeper
            </span>
          </NavLink>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#1a3c2e] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Home size={15} />
              Home
            </NavLink>
            <NavLink
              to="/timeline"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#1a3c2e] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Clock size={15} />
              Timeline
            </NavLink>
            <NavLink
              to="/stats"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#1a3c2e] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <BarChart2 size={15} />
              Stats
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

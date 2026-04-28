import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-[#f0f7f4] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl font-black text-[#1a3c2e]">?</span>
        </div>
        <h1 className="text-6xl font-black text-[#1a3c2e] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Looks like this page drifted away — just like friendships we forget to maintain.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-[#1a3c2e] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#2a5c42] transition-colors"
        >
          <Home size={18} />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

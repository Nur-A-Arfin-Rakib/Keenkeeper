import { useState } from "react";
import { Phone, MessageSquare, Video, Clock } from "lucide-react";
import { useTimeline } from "../context/TimelineContext";

const typeConfig = {
  Call: { icon: Phone, bg: "bg-green-100", text: "text-green-700", label: "Call" },
  Text: { icon: MessageSquare, bg: "bg-blue-100", text: "text-blue-700", label: "Text" },
  Video: { icon: Video, bg: "bg-purple-100", text: "text-purple-700", label: "Video" },
};

const Timeline = () => {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Call", "Text", "Video"];

  const filtered =
    filter === "All" ? entries : entries.filter((e) => e.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">📜 Timeline</h1>
          <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-[#1a3c2e] text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Clock size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No entries yet</p>
            <p className="text-sm mt-1">Go to a friend's page and log a check-in!</p>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="space-y-4">
              {filtered.map((entry, idx) => {
                const cfg = typeConfig[entry.type] || typeConfig["Call"];
                const IconComp = cfg.icon;
                return (
                  <div key={entry.id} className="flex gap-4 relative">
                    {/* Icon bubble */}
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                      <IconComp size={18} className={cfg.text} />
                    </div>
                    {/* Content */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-gray-900 text-sm">{entry.title}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                          {entry.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{entry.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;

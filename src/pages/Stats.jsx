import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTimeline } from "../context/TimelineContext";
import { Phone, MessageSquare, Video } from "lucide-react";

const COLORS = ["#1a3c2e", "#7ecba3", "#b5e8d0"];

const Stats = () => {
  const { entries } = useTimeline();

  const callCount = entries.filter((e) => e.type === "Call").length;
  const textCount = entries.filter((e) => e.type === "Text").length;
  const videoCount = entries.filter((e) => e.type === "Video").length;

  const data = [
    { name: "Call", value: callCount },
    { name: "Text", value: textCount },
    { name: "Video", value: videoCount },
  ].filter((d) => d.value > 0);

  const statCards = [
    { label: "Total Calls", value: callCount, icon: Phone, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Texts", value: textCount, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Videos", value: videoCount, icon: Video, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Friendship Analytics</h1>
        <p className="text-gray-500 mb-8">A breakdown of your interactions by type</p>

        {/* Stat Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center mx-auto mb-3`}>
                <Icon size={18} className={color} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            Interaction Breakdown
          </h2>
          {data.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-sm">No interactions logged yet.</p>
              <p className="text-sm mt-1">Go check in with a friend!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={130}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} interactions`, name]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;

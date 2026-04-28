import { useNavigate } from "react-router-dom";

const statusConfig = {
  overdue: {
    label: "Overdue",
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-500",
    border: "border-red-200",
  },
  "almost due": {
    label: "Almost Due",
    bg: "bg-amber-100",
    text: "text-amber-700",
    dot: "bg-amber-500",
    border: "border-amber-200",
  },
  "on-track": {
    label: "On Track",
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
    border: "border-green-200",
  },
};

const FriendCard = ({ friend }) => {
  const navigate = useNavigate();
  const cfg = statusConfig[friend.status] || statusConfig["on-track"];

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
    >
      <div className="p-5 flex flex-col items-center text-center gap-3">
        <div className="relative">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
          />
          <span className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${cfg.dot}`}></span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{friend.name}</h3>
    <p className="text-xs text-gray-400 mt-0.5">Last contact: {friend.days_since_contact} days ago</p>
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          {friend.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-[#f0f7f4] text-[#1a3c2e] px-2 py-0.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className={`text-[11px] font-semibold px-3 py-1 rounded-full ${cfg.bg} ${cfg.text}`}
        >
          {cfg.label}
        </span>
      </div>
    </div>
  );
};

export default FriendCard;

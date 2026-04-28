import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Phone,
  MessageSquare,
  Video,
  Clock,
  Target,
  Calendar,
  AlarmClock,
  Archive,
  Trash2,
  ArrowLeft,
  Pencil,
} from "lucide-react";
import friendsData from "../data/friends.json";
import { useTimeline } from "../context/TimelineContext";

const statusConfig = {
  overdue: { label: "Overdue", bg: "bg-red-100", text: "text-red-700" },
  "almost due": { label: "Almost Due", bg: "bg-amber-100", text: "text-amber-700" },
  "on-track": { label: "On Track", bg: "bg-green-100", text: "text-green-700" },
};

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();

  const friend = friendsData.find((f) => f.id === parseInt(id));

  if (!friend) {
    navigate("/404");
    return null;
  }

  const cfg = statusConfig[friend.status] || statusConfig["on-track"];

  const handleCheckIn = (type) => {
    addEntry(type, friend.name);
    toast.success(`${type} with ${friend.name} logged! 🎉`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back to Friends
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{friend.name}</h1>
                  <span className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
                    {cfg.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {friend.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-[#f0f7f4] text-[#1a3c2e] px-3 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{friend.bio}</p>
                <p className="text-sm text-[#1a3c2e] font-medium">{friend.email}</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-gray-100">
                <button className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors text-xs font-medium">
                  <AlarmClock size={16} />
                  Snooze 2 Weeks
                </button>
                <button className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-xs font-medium">
                  <Archive size={16} />
                  Archive
                </button>
                <button className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors text-xs font-medium">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
                <Clock size={20} className="mx-auto text-[#1a3c2e] mb-2" />
                <p className="text-2xl font-bold text-gray-900">{friend.days_since_contact}</p>
                <p className="text-xs text-gray-400 mt-1">Days Since Contact</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
                <Target size={20} className="mx-auto text-[#1a3c2e] mb-2" />
                <p className="text-2xl font-bold text-gray-900">{friend.goal}</p>
                <p className="text-xs text-gray-400 mt-1">Goal (days)</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
                <Calendar size={20} className="mx-auto text-[#1a3c2e] mb-2" />
                <p className="text-lg font-bold text-gray-900">{friend.next_due_date}</p>
                <p className="text-xs text-gray-400 mt-1">Next Due Date</p>
              </div>
            </div>

            {/* Relationship Goal Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Relationship Goal</h3>
                <button className="flex items-center gap-1 text-xs text-[#1a3c2e] font-medium hover:underline">
                  <Pencil size={13} />
                  Edit
                </button>
              </div>
              <p className="text-sm text-gray-500">
                You want to stay in touch with{" "}
                <span className="font-semibold text-gray-800">{friend.name}</span> every{" "}
                <span className="font-semibold text-[#1a3c2e]">{friend.goal} days</span>.
              </p>
              <div className="mt-3 bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    friend.status === "overdue"
                      ? "bg-red-500"
                      : friend.status === "almost due"
                      ? "bg-amber-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min((friend.days_since_contact / friend.goal) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">
                {friend.days_since_contact} / {friend.goal} days used
              </p>
            </div>

            {/* Quick Check-In Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleCheckIn("Call")}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl bg-[#f0f7f4] hover:bg-[#1a3c2e] text-[#1a3c2e] hover:text-white transition-all font-medium text-sm"
                >
                  <Phone size={20} />
                  Call
                </button>
                <button
                  onClick={() => handleCheckIn("Text")}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl bg-[#f0f7f4] hover:bg-[#1a3c2e] text-[#1a3c2e] hover:text-white transition-all font-medium text-sm"
                >
                  <MessageSquare size={20} />
                  Text
                </button>
                <button
                  onClick={() => handleCheckIn("Video")}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl bg-[#f0f7f4] hover:bg-[#1a3c2e] text-[#1a3c2e] hover:text-white transition-all font-medium text-sm"
                >
                  <Video size={20} />
                  Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetail;

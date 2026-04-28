import { useState, useEffect } from "react";
import { UserPlus, Users, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import FriendCard from "../components/FriendCard";
import friendsData from "../data/friends.json";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="w-12 h-12 border-4 border-[#1a3c2e]/20 border-t-[#1a3c2e] rounded-full animate-spin"></div>
    <p className="text-gray-400 text-sm">Loading your friends...</p>
  </div>
);

const Home = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 1200);
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter((f) => f.status === "on-track").length;
  const almostDue = friends.filter((f) => f.status === "almost due").length;
  const overdue = friends.filter((f) => f.status === "overdue").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-[#1a3c2e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Friends to keep close<br />
            <span className="text-[#7ecba3]">in your life</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            Your personal friendship tracker. Stay meaningful, stay connected — never let important friendships drift away again.
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-[#1a3c2e] font-semibold px-6 py-3 rounded-xl hover:bg-[#7ecba3] hover:text-[#1a3c2e] transition-all shadow-md">
            <UserPlus size={18} />
            Add a Friend
          </button>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users size={16} className="text-[#7ecba3]" />
                <span className="text-2xl font-bold">{totalFriends}</span>
              </div>
              <p className="text-white/60 text-xs">Total Friends</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-2xl font-bold">{onTrack}</span>
              </div>
              <p className="text-white/60 text-xs">On Track</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock size={16} className="text-amber-400" />
                <span className="text-2xl font-bold">{almostDue}</span>
              </div>
              <p className="text-white/60 text-xs">Almost Due</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <AlertTriangle size={16} className="text-red-400" />
                <span className="text-2xl font-bold">{overdue}</span>
              </div>
              <p className="text-white/60 text-xs">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Friends Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Friends</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';

function CommunityDashboard() {
  const [stats, setStats] = useState({
    views: 1800,
    comments: 50,
    likes: 63,
    tallyRegistrations: 4,
    telegramMembers: 50,
    totalStaked: 125000,
    activeVoters: 28
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        views: prev.views + Math.floor(Math.random() * 10),
        likes: prev.likes + Math.floor(Math.random() * 3),
        comments: prev.comments + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { label: 'Total Views', value: stats.views.toLocaleString(), icon: '👁️', color: 'from-[#00f0ff] to-[#6b00ff]' },
    { label: 'Comments', value: stats.comments, icon: '💬', color: 'from-[#ff00cc] to-[#6b00ff]' },
    { label: 'Likes', value: stats.likes, icon: '❤️', color: 'from-[#00f0ff] to-[#ff00cc]' },
    { label: 'Tally Sign-ups', value: stats.tallyRegistrations, icon: '📝', color: 'from-[#6b00ff] to-[#ff00cc]' },
    { label: 'TG Members', value: stats.telegramMembers, icon: '✈️', color: 'from-[#00f0ff] to-[#6b00ff]' },
    { label: '$ZORBLY Staked', value: stats.totalStaked.toLocaleString(), icon: '💎', color: 'from-[#ff00cc] to-[#00f0ff]' },
  ];

  return (
    <div className="glass-morphism rounded-2xl p-8 scan-effect">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#00f0ff] via-[#ff00cc] to-[#6b00ff] bg-clip-text text-transparent">
              Community Dashboard
            </span>
          </h2>
          <p className="text-gray-400">Real-time stats from your ZORBLY campaigns</p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/50">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-semibold">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className="cyber-card rounded-xl p-4 hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold mb-1">
              <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </span>
            </div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="cyber-card rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-[#00f0ff]">📊</span>
            Engagement Trends
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Views Growth</span>
                <span className="text-green-400 font-semibold">+24.5%</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#6b00ff] w-[75%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Social Reach</span>
                <span className="text-green-400 font-semibold">+18.2%</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#ff00cc] to-[#6b00ff] w-[60%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Conversions</span>
                <span className="text-green-400 font-semibold">+31.7%</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00cc] w-[85%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-[#ff00cc]">🔥</span>
            Recent Activity
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {[
              { user: 'anon_trader', action: 'voted for mutation', time: '2m ago' },
              { user: 'crypto_king', action: 'staked 500 $ZORBLY', time: '5m ago' },
              { user: 'moon_boy', action: 'registered on Tally', time: '8m ago' },
              { user: 'diamond_hands', action: 'claimed airdrop', time: '12m ago' },
              { user: 'whale_watcher', action: 'voted for mutation', time: '15m ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm p-2 rounded-lg bg-black/30">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f0ff]/30 to-[#ff00cc]/30 flex items-center justify-center">
                  👤
                </div>
                <div className="flex-1">
                  <span className="text-[#00f0ff] font-semibold">{activity.user}</span>
                  <span className="text-gray-400"> {activity.action}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.CommunityDashboard = CommunityDashboard;
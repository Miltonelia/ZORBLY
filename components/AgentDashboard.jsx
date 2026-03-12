import React, { useState, useEffect } from 'react';

const AGENTS = [
  {
    id: 'content',
    name: 'Content Agent',
    icon: '🎨',
    description: 'Generates meme images, videos & captions',
    fee: 10,
    outputs: ['Meme created', 'Video generated', 'Caption optimized']
  },
  {
    id: 'launch',
    name: 'Launch Agent',
    icon: '🚀',
    description: 'Deploys memecoin on Pump.fun',
    fee: 50,
    outputs: ['Token deployed', 'Liquidity added', 'Contract verified']
  },
  {
    id: 'social',
    name: 'Social Agent',
    icon: '📱',
    description: 'Auto-posts to all social platforms',
    fee: 20,
    outputs: ['Posted to X', 'Telegram channel updated', 'YouTube Short uploaded', 'TikTok posted']
  },
  {
    id: 'community',
    name: 'Community Agent',
    icon: '👥',
    description: 'Creates Tally forms & manages signups',
    fee: 15,
    outputs: ['Tally form created', 'Whitelist setup', 'Email automation ready']
  },
  {
    id: 'mutation',
    name: 'Mutation Agent',
    icon: '🧬',
    description: 'Evolves based on community votes',
    fee: 5,
    outputs: ['New avatar generated', 'Traits updated', 'Evolution complete']
  }
];

function AgentDashboard({ isExecuting }) {
  const [activeAgents, setActiveAgents] = useState({});
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (isExecuting) {
      // Activate agents sequentially with delays
      const activationTimes = [0, 1500, 3000, 4500, 6000];
      
      AGENTS.forEach((agent, idx) => {
        setTimeout(() => {
          setActiveAgents(prev => ({ ...prev, [agent.id]: true }));
          
          // Simulate progress
          let currentProgress = 0;
          const interval = setInterval(() => {
            currentProgress += Math.random() * 15;
            if (currentProgress >= 100) {
              currentProgress = 100;
              clearInterval(interval);
            }
            setProgress(prev => ({ ...prev, [agent.id]: Math.min(100, Math.floor(currentProgress)) }));
          }, 300);
        }, activationTimes[idx]);
      });
    } else {
      setActiveAgents({});
      setProgress({});
    }
  }, [isExecuting]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-[#00f0ff] via-[#ff00cc] to-[#6b00ff] bg-clip-text text-transparent neon-text">
            Multi-Agent System
          </span>
        </h2>
        <p className="text-gray-400">5 AI agents working together to bring your vision to life</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AGENTS.map((agent) => (
          <window.AgentCard
            key={agent.id}
            agent={agent}
            isActive={activeAgents[agent.id]}
            progress={progress[agent.id] || 0}
          />
        ))}
      </div>

      {Object.keys(activeAgents).length > 0 && (
        <div className="glass-morphism rounded-xl p-6 text-center">
          <div className="text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#00f0ff] to-[#ff00cc] bg-clip-text text-transparent">
              Total Cost: {AGENTS.reduce((sum, agent) => activeAgents[agent.id] ? sum + agent.fee : sum, 0)} $ZORBLY
            </span>
          </div>
          <p className="text-sm text-gray-400">Agents are executing your prompt...</p>
        </div>
      )}
    </div>
  );
}

window.AgentDashboard = AgentDashboard;
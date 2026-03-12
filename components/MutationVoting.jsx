import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

function MutationVoting() {
  const { connected } = useWallet();
  const [selectedMutation, setSelectedMutation] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  const mutations = [
    {
      id: 1,
      name: 'Cyber Samurai',
      description: 'Enhanced combat protocols, neon katana',
      votes: 142,
      image: '⚔️',
      traits: ['Speed +20%', 'Attack +15%', 'Neon Blade']
    },
    {
      id: 2,
      name: 'Quantum Wizard',
      description: 'Reality-bending magic, holographic spells',
      votes: 98,
      image: '🧙',
      traits: ['Intelligence +25%', 'Mana +30%', 'Portal Creation']
    },
    {
      id: 3,
      name: 'Mech Titan',
      description: 'Heavy armor, plasma cannons',
      votes: 76,
      image: '🤖',
      traits: ['Defense +35%', 'Power +20%', 'Missile Barrage']
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleVote = (mutationId) => {
    if (!connected || hasVoted) return;
    setSelectedMutation(mutationId);
    setHasVoted(true);
  };

  const totalVotes = mutations.reduce((sum, m) => sum + m.votes, 0) + (hasVoted ? 1 : 0);

  return (
    <div className="glass-morphism rounded-2xl p-8 scan-effect">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-[#00f0ff] via-[#ff00cc] to-[#6b00ff] bg-clip-text text-transparent neon-text">
            Agent Mutation Voting
          </span>
        </h2>
        <p className="text-gray-400 mb-4">Vote for the next evolution - Agents evolve every 24h</p>
        
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff]/20 to-[#ff00cc]/20 border border-[#00f0ff]/50">
          <svg className="w-6 h-6 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-2xl font-bold text-[#ff00cc]">{formatTime(timeLeft)}</span>
          <span className="text-gray-400">until mutation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {mutations.map((mutation) => {
          const votePercentage = ((mutation.votes + (selectedMutation === mutation.id ? 1 : 0)) / totalVotes * 100).toFixed(1);
          const isSelected = selectedMutation === mutation.id;
          
          return (
            <div
              key={mutation.id}
              className={`cyber-card rounded-xl p-6 cursor-pointer transition-all duration-300 ${isSelected ? 'scale-105 glow-border' : 'hover:scale-102'} ${hasVoted && !isSelected ? 'opacity-60' : ''}`}
              onClick={() => handleVote(mutation.id)}
            >
              <div className="text-6xl text-center mb-4 animate-float">
                {mutation.image}
              </div>
              
              <h3 className="text-xl font-bold text-center mb-2 text-[#00f0ff]">
                {mutation.name}
              </h3>
              
              <p className="text-sm text-gray-400 text-center mb-4">
                {mutation.description}
              </p>

              <div className="space-y-2 mb-4">
                {mutation.traits.map((trait, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff00cc]"></div>
                    <span className="text-gray-300">{trait}</span>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Votes</span>
                  <span className="font-bold text-[#00f0ff]">
                    {mutation.votes + (isSelected ? 1 : 0)} ({votePercentage}%)
                  </span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00cc] transition-all duration-500"
                    style={{ width: `${votePercentage}%` }}
                  ></div>
                </div>
              </div>

              {isSelected && (
                <div className="text-center text-sm font-semibold text-green-400 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Voted!
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!connected && (
        <div className="text-center p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
          ⚠️ Connect your wallet to vote for mutations
        </div>
      )}

      {hasVoted && connected && (
        <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
          ✅ Your vote has been recorded! Come back in {formatTime(timeLeft)} to see the results
        </div>
      )}

      <div className="mt-8 cyber-card rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>🎨</span>
          <span className="bg-gradient-to-r from-[#00f0ff] to-[#ff00cc] bg-clip-text text-transparent">
            Preview: Next Mutation
          </span>
        </h3>
        <div className="flex items-center gap-6">
          <img 
            src="assets/mutation-preview.webp" 
            alt="Mutation Preview" 
            className="w-48 h-48 rounded-xl object-cover border-2 border-[#00f0ff]/50"
          />
          <div className="flex-1">
            <p className="text-gray-300 mb-4">
              The winning mutation will be revealed in {formatTime(timeLeft)}. The agent will evolve with new traits, abilities, and visual updates based on community choice.
            </p>
            <div className="flex gap-2">
              <div className="px-3 py-1 rounded-lg bg-[#00f0ff]/20 text-[#00f0ff] text-sm">
                Dynamic Evolution
              </div>
              <div className="px-3 py-1 rounded-lg bg-[#ff00cc]/20 text-[#ff00cc] text-sm">
                Community Driven
              </div>
              <div className="px-3 py-1 rounded-lg bg-[#6b00ff]/20 text-[#6b00ff] text-sm">
                Forever Unique
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.MutationVoting = MutationVoting;
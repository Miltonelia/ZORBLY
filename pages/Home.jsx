import React, { useState, useEffect } from 'react';

function Home() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState('prompt');
  const [isTelegramApp, setIsTelegramApp] = useState(false);

  useEffect(() => {
    // Check if running in Telegram
    if (window.Telegram?.WebApp) {
      setIsTelegramApp(true);
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  const handleExecutePrompt = async (prompt) => {
    console.log('Executing prompt:', prompt);
    setIsExecuting(true);
    
    // Simulate execution time
    setTimeout(() => {
      setIsExecuting(false);
      setActiveTab('community');
    }, 8000);
  };

  const tabs = [
    { id: 'prompt', label: 'Create', icon: '⚡' },
    { id: 'dashboard', label: 'Agents', icon: '🤖' },
    { id: 'voting', label: 'Voting', icon: '🗳️' },
    { id: 'community', label: 'Stats', icon: '📊' },
    { id: 'airdrop', label: 'Airdrop', icon: '🎁' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Particle Background */}
      <window.ParticleBackground />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00f0ff]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#ff00cc]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#6b00ff]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-3">
                <span className="bg-gradient-to-r from-[#00f0ff] via-[#ff00cc] to-[#6b00ff] bg-clip-text text-transparent neon-text">
                  ZORBLY AGENT
                </span>
              </h1>
              <p className="text-xl text-gray-400">
                The First Decentralized Multi-Agent AI Platform for Creators
              </p>
              {isTelegramApp && (
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00f0ff]/20 border border-[#00f0ff]/50">
                  <span className="text-[#00f0ff]">✈️</span>
                  <span className="text-sm">Running in Telegram</span>
                </div>
              )}
            </div>
            
            <div className="w-full md:w-auto">
              <window.WalletConnect />
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="glass-morphism rounded-2xl p-2 mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#00f0ff] to-[#ff00cc] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-slide-up">
          {activeTab === 'prompt' && (
            <window.PromptInput onExecute={handleExecutePrompt} />
          )}

          {activeTab === 'dashboard' && (
            <window.AgentDashboard isExecuting={isExecuting} />
          )}

          {activeTab === 'voting' && (
            <window.MutationVoting />
          )}

          {activeTab === 'community' && (
            <window.CommunityDashboard />
          )}

          {activeTab === 'airdrop' && (
            <window.AirdropClaim />
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cyber-card rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2 text-[#00f0ff]">One Prompt Does All</h3>
            <p className="text-sm text-gray-400">
              Single input field triggers content creation, token launch, social posting, and community management
            </p>
          </div>

          <div className="cyber-card rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🧬</div>
            <h3 className="text-xl font-bold mb-2 text-[#ff00cc]">Evolves Forever</h3>
            <p className="text-sm text-gray-400">
              Agents mutate every 24h based on community votes. Never obsolete, always improving
            </p>
          </div>

          <div className="cyber-card rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-bold mb-2 text-[#6b00ff]">Powered by $ZORBLY</h3>
            <p className="text-sm text-gray-400">
              Stake tokens for priority access, reduced fees, and governance rights
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="hover:text-[#00f0ff] transition-colors">Docs</a>
            <a href="#" className="hover:text-[#ff00cc] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#6b00ff] transition-colors">Telegram</a>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">Discord</a>
          </div>
          <p>© 2026 ZORBLY AGENT. Built on Solana. Forever evolving.</p>
        </footer>
      </div>
    </div>
  );
}

window.Home = Home;
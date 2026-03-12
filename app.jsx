import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkDependencies = () => {
      if (
        window.WalletProvider &&
        window.WalletConnect &&
        window.PromptInput &&
        window.AgentCard &&
        window.AgentDashboard &&
        window.CommunityDashboard &&
        window.MutationVoting &&
        window.AirdropClaim &&
        window.ParticleBackground &&
        window.Home
      ) {
        setIsReady(true);
      }
    };

    checkDependencies();
    const interval = setInterval(checkDependencies, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#00f0ff]/20 border-t-[#00f0ff] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-[#ff00cc]/20 border-t-[#ff00cc] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="mt-6 text-xl font-semibold bg-gradient-to-r from-[#00f0ff] via-[#ff00cc] to-[#6b00ff] bg-clip-text text-transparent">
          Initializing ZORBLY AGENT...
        </p>
      </div>
    );
  }

  return (
    <window.WalletProvider>
      <window.Home />
    </window.WalletProvider>
  );
}

createRoot(document.getElementById('renderDiv')).render(<App />);
import React, { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

function AirdropClaim() {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [airdropAmount] = useState(Math.floor(Math.random() * 500) + 100);

  const handleClaim = async () => {
    if (!connected || claimed) return;

    setClaiming(true);
    
    // Simulate claim transaction
    setTimeout(() => {
      setClaimed(true);
      setClaiming(false);
    }, 2500);
  };

  return (
    <div className="glass-morphism rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-float">🎁</div>
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-[#00f0ff] via-[#ff00cc] to-[#6b00ff] bg-clip-text text-transparent neon-text">
            Claim Your $ZORBLY Airdrop
          </span>
        </h2>
        <p className="text-gray-400">Exclusive rewards for early supporters</p>
      </div>

      <div className="cyber-card rounded-xl p-8 mb-6 text-center">
        <div className="text-5xl font-bold mb-2">
          <span className="bg-gradient-to-r from-[#00f0ff] to-[#ff00cc] bg-clip-text text-transparent">
            {airdropAmount.toLocaleString()}
          </span>
        </div>
        <div className="text-xl text-gray-300 mb-4">$ZORBLY Tokens</div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 rounded-lg bg-black/30">
            <span className="text-gray-400">Your Wallet:</span>
            <span className="font-mono text-sm text-[#00f0ff]">
              {connected ? `${publicKey?.toString().slice(0, 4)}...${publicKey?.toString().slice(-4)}` : 'Not Connected'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-black/30">
            <span className="text-gray-400">Eligibility:</span>
            <span className="text-green-400 font-semibold">✅ Verified</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-black/30">
            <span className="text-gray-400">Network:</span>
            <span className="text-[#ff00cc]">Solana Devnet</span>
          </div>
        </div>

        <button
          onClick={handleClaim}
          disabled={!connected || claiming || claimed}
          className="w-full py-4 rounded-xl font-bold text-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] via-[#ff00cc] to-[#6b00ff] group-hover:scale-105 transition-transform duration-300"></div>
          <div className="relative flex items-center justify-center gap-3">
            {claiming ? (
              <>
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing Claim...
              </>
            ) : claimed ? (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Claimed Successfully!
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {connected ? 'Claim Airdrop' : 'Connect Wallet to Claim'}
              </>
            )}
          </div>
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#00f0ff]/5 border border-[#00f0ff]/20">
          <div className="text-2xl">💡</div>
          <div>
            <div className="font-semibold text-[#00f0ff] mb-1">Stake for Priority</div>
            <div className="text-sm text-gray-400">
              Stake your $ZORBLY tokens to get priority access to new features and faster agent execution
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#ff00cc]/5 border border-[#ff00cc]/20">
          <div className="text-2xl">🗳️</div>
          <div>
            <div className="font-semibold text-[#ff00cc] mb-1">Vote for New Agents</div>
            <div className="text-sm text-gray-400">
              Token holders can propose and vote for new agents to be added to the platform
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#6b00ff]/5 border border-[#6b00ff]/20">
          <div className="text-2xl">🎯</div>
          <div>
            <div className="font-semibold text-[#6b00ff] mb-1">Reduced Fees</div>
            <div className="text-sm text-gray-400">
              Stakers enjoy up to 50% reduced fees on all agent executions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.AirdropClaim = AirdropClaim;
import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

function PromptInput({ onExecute }) {
  const [prompt, setPrompt] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const { connected } = useWallet();

  const examplePrompts = [
    "Create a meme about Elon Musk on Mars, launch it as memecoin on Pump.fun, post on X/Telegram/YouTube Shorts/TikTok, create Tally form for early holders",
    "Generate viral crypto meme, deploy token, share everywhere, collect whitelist",
    "Make funny Solana meme, launch coin, auto-post all socials, form for airdrop"
  ];

  const handleExecute = async () => {
    if (!prompt.trim() || !connected) return;
    
    setIsExecuting(true);
    await onExecute(prompt);
    setIsExecuting(false);
  };

  return (
    <div className="glass-morphism rounded-2xl p-8 scan-effect">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <span className="bg-gradient-to-r from-[#00f0ff] via-[#ff00cc] to-[#6b00ff] bg-clip-text text-transparent">
          Enter Your Prompt
        </span>
      </h2>
      
      <div className="relative mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your creative prompt here... (e.g., Create a meme about crypto, launch as token, post everywhere)"
          className="w-full h-32 bg-black/50 border-2 border-[#00f0ff]/30 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff00cc]/50 transition-all duration-300 resize-none font-medium"
          disabled={isExecuting}
        />
        
        <div className="absolute bottom-4 right-4 text-xs text-gray-500">
          {prompt.length} / 500
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-3">Try these examples:</div>
        <div className="space-y-2">
          {examplePrompts.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(example)}
              className="w-full text-left px-4 py-2 rounded-lg bg-[#00f0ff]/5 border border-[#00f0ff]/20 hover:border-[#00f0ff]/40 text-sm text-gray-300 hover:text-white transition-all duration-300"
              disabled={isExecuting}
            >
              {example.slice(0, 80)}...
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleExecute}
        disabled={!prompt.trim() || !connected || isExecuting}
        className="w-full py-4 rounded-xl font-bold text-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] via-[#ff00cc] to-[#6b00ff] group-hover:scale-105 transition-transform duration-300"></div>
        <div className="relative flex items-center justify-center gap-3">
          {isExecuting ? (
            <>
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              Executing Agents...
            </>
          ) : (
            <>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
              </svg>
              {connected ? 'Execute Multi-Agent System' : 'Connect Wallet to Execute'}
            </>
          )}
        </div>
      </button>

      {!connected && (
        <div className="mt-4 text-center text-sm text-yellow-400">
          ⚠️ Please connect your Solana wallet to execute prompts
        </div>
      )}
    </div>
  );
}

window.PromptInput = PromptInput;
import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

function WalletConnect() {
  const { publicKey, connected, disconnect, select, wallets, wallet } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [zorblyBalance, setZorblyBalance] = useState(0);
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      connection.getBalance(publicKey).then(bal => {
        setBalance(bal / LAMPORTS_PER_SOL);
      });
      
      // Simulate $ZORBLY balance
      setZorblyBalance(Math.floor(Math.random() * 10000) + 1000);
    }
  }, [connected, publicKey, connection]);

  const handleConnect = (walletName) => {
    const selectedWallet = wallets.find(w => w.adapter.name === walletName);
    if (selectedWallet) {
      select(selectedWallet.adapter.name);
    }
    setShowWalletModal(false);
  };

  if (connected && publicKey) {
    return (
      <div className="glass-morphism rounded-xl p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-xs text-gray-400 mb-1">Connected Wallet</div>
          <div className="font-mono text-sm text-[#00f0ff]">
            {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-gray-400">SOL Balance</div>
          <div className="text-sm font-bold text-white">{balance.toFixed(4)}</div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-gray-400">$ZORBLY</div>
          <div className="text-sm font-bold text-[#ff00cc]">{zorblyBalance.toLocaleString()}</div>
        </div>
        
        <button
          onClick={disconnect}
          className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all duration-300"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowWalletModal(true)}
        className="relative px-8 py-4 rounded-xl overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] via-[#ff00cc] to-[#6b00ff] opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center gap-3 font-bold text-white">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Connect Wallet
        </div>
      </button>

      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowWalletModal(false)}>
          <div className="glass-morphism rounded-2xl p-8 max-w-md w-full mx-4 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold neon-text">Select Wallet</h2>
              <button onClick={() => setShowWalletModal(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              {wallets.map((w) => (
                <button
                  key={w.adapter.name}
                  onClick={() => handleConnect(w.adapter.name)}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-[#00f0ff]/10 to-[#ff00cc]/10 border border-[#00f0ff]/30 hover:border-[#ff00cc]/50 transition-all duration-300 flex items-center gap-4 group"
                >
                  {w.adapter.icon && (
                    <img src={w.adapter.icon} alt={w.adapter.name} className="w-10 h-10" />
                  )}
                  <span className="text-lg font-semibold group-hover:text-[#00f0ff] transition-colors">
                    {w.adapter.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

window.WalletConnect = WalletConnect;
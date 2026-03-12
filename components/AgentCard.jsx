import React from 'react';

function AgentCard({ agent, isActive, progress }) {
  const getStatusColor = () => {
    if (!isActive) return 'text-gray-500';
    if (progress === 100) return 'text-green-400';
    return 'text-[#00f0ff]';
  };

  const getStatusText = () => {
    if (!isActive) return 'Standby';
    if (progress === 100) return 'Complete';
    return 'Processing...';
  };

  return (
    <div className={`cyber-card rounded-xl p-6 transition-all duration-500 ${isActive ? 'agent-card-active' : 'opacity-60'}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isActive ? 'bg-gradient-to-br from-[#00f0ff]/20 to-[#ff00cc]/20' : 'bg-gray-800'} ${isActive ? 'animate-float' : ''}`}>
            <div className="text-3xl">{agent.icon}</div>
          </div>
          {isActive && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
          <p className="text-sm text-gray-400">{agent.description}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Status:</span>
          <span className={`font-semibold ${getStatusColor()}`}>{getStatusText()}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Fee:</span>
          <span className="font-semibold text-[#ff00cc]">{agent.fee} $ZORBLY</span>
        </div>
      </div>

      {isActive && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-black/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00cc] transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {progress === 100 && (
        <div className="mt-4 space-y-2">
          {agent.outputs?.map((output, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-green-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {output}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

window.AgentCard = AgentCard;
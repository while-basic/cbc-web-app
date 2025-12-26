
import React, { useState } from 'react';

interface AuthProps {
  onIdentity: (name: string) => void;
  currentIdentity?: string;
  onLogout: () => void;
}

const Auth: React.FC<AuthProps> = ({ onIdentity, currentIdentity, onLogout }) => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onIdentity(inputValue.trim().toLowerCase());
      setInputValue('');
      setIsExpanding(false);
    }
  };

  if (currentIdentity) {
    return (
      <div className="flex items-center space-x-6">
        <span className="text-white text-[10px] tracking-[0.2em] uppercase font-medium opacity-80">
          Identity established: {currentIdentity}
        </span>
        {/* Fix: use onLogout prop instead of undefined handleLogout */}
        <button 
          onClick={onLogout}
          className="text-white/40 hover:text-white text-[9px] tracking-[0.3em] uppercase transition-all duration-300 font-bold"
        >
          [ Release ]
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {!isExpanding ? (
        <button 
          onClick={() => setIsExpanding(true)}
          className="text-white hover:text-white/80 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 font-medium border-b border-white/20 pb-0.5"
        >
          Connect Identity
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center animate-in fade-in slide-in-from-top-1 duration-500">
          <input 
            autoFocus
            type="text"
            placeholder="WHO ARE YOU?..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent border-none text-[10px] tracking-[0.2em] uppercase text-white placeholder-white/20 focus:ring-0 w-40 p-0 font-medium"
          />
          <button type="submit" className="hidden">Submit</button>
          <button 
            type="button"
            onClick={() => setIsExpanding(false)}
            className="ml-4 text-white/30 hover:text-white text-[10px]"
          >
            ESC
          </button>
        </form>
      )}
    </div>
  );
};

export default Auth;

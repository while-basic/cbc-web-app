
import React, { useState, useEffect } from 'react';
import LaunchScreen from './components/LaunchScreen';
import ChatInterface from './components/ChatInterface';
import Auth from './components/Auth';

const IDENTITY_KEY = 'portal_current_identity';

const App: React.FC = () => {
  const [showLaunch, setShowLaunch] = useState(true);
  const [userPresence, setUserPresence] = useState<string | undefined>(undefined);

  // Persistence of identity
  useEffect(() => {
    const savedIdentity = localStorage.getItem(IDENTITY_KEY);
    if (savedIdentity) {
      setUserPresence(savedIdentity);
    }
  }, []);

  const handleIdentity = (name: string) => {
    setUserPresence(name);
    localStorage.setItem(IDENTITY_KEY, name);
  };

  const handleLogout = () => {
    setUserPresence(undefined);
    localStorage.removeItem(IDENTITY_KEY);
  };

  return (
    <div className="h-screen w-screen bg-[#0A0A0A] overflow-hidden text-white selection:bg-white/5">
      {showLaunch ? (
        <LaunchScreen onStart={() => setShowLaunch(false)} />
      ) : (
        <div className="h-full relative flex flex-col overflow-hidden">
          {/* Identity Anchor - Semi-Static Overlay */}
          <header className="fixed top-0 left-0 right-0 pt-[8vh] flex flex-col items-center pointer-events-none z-10 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pb-12">
            <h1 className="text-2xl md:text-3xl font-medium tracking-tighter text-white/90 animate-in fade-in duration-2000">
              Christopher Celaya
            </h1>
            <div className="mt-3 flex flex-col items-center space-y-3 pointer-events-auto">
              <div className="flex items-center space-x-2 text-white/30 text-[10px] font-medium tracking-widest pulse uppercase">
                <p>CLOS: Cognitive Life Operating System</p>
              </div>
              <Auth 
                currentIdentity={userPresence} 
                onIdentity={handleIdentity} 
                onLogout={handleLogout}
              />
            </div>
          </header>

          {/* Core Content Layer - Constrained Height */}
          <main className="flex-1 min-h-0 relative z-0">
            <ChatInterface userId={userPresence} />
          </main>

          {/* Minimalist Portal Status */}
          <footer className="fixed bottom-8 right-10 text-[8px] uppercase tracking-[0.5em] text-white/[0.05] font-black hidden md:block pointer-events-none">
            Environment V.01-BETA
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;

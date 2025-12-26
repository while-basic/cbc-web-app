
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToPortal } from '../services/geminiService';
import ProjectCard from './ProjectCard';

const STORAGE_KEY = 'portal_chat_history';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load history on initial mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Robust auto-scroll to bottom behavior
  useEffect(() => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.text }]
    }));

    try {
      const response = await sendMessageToPortal(userMessage.text, history);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: response.text,
        cards: response.cards
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Portal error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm("End session and clear portal history?")) {
      setMessages([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full px-5 relative">
=======
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full px-6 relative">
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
      {/* Reset Session Control */}
      {messages.length > 0 && (
        <button 
          onClick={clearHistory}
          className="fixed top-[18vh] right-8 md:right-12 z-20 text-[9px] uppercase tracking-[0.3em] text-white/20 hover:text-white/50 transition-colors font-bold"
        >
          Reset
        </button>
      )}

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pb-48 pt-[35vh]"
      >
<<<<<<< HEAD
        <div className="space-y-20">
=======
        <div className="space-y-16">
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
          {messages.length === 0 && (
            <div className="animate-in fade-in duration-1000">
               <div className="text-white/20 text-sm font-light italic pl-8 border-l border-white/5 tracking-tight">
                Portal is open. Silence waiting for inquiry.
              </div>
            </div>
          )}
          
          {messages.map((message) => (
<<<<<<< HEAD
            <div key={message.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500 mb-6">
              <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] md:max-w-[65%] ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-[#0066FF] via-[#0052CC] to-[#0040AA] text-white rounded-3xl px-6 py-4 shadow-2xl shadow-blue-500/40 border border-blue-400/20' 
                    : 'bg-[#151515] text-[#F0F0F0] rounded-3xl px-6 py-4 shadow-xl border border-[#2A2A2A]/50 backdrop-blur-sm'
                }`}>
                  <div className={`text-base leading-relaxed whitespace-pre-wrap ${
                    message.role === 'user' ? 'font-medium' : 'font-light'
                  } tracking-normal`}>
                    {message.text}
                  </div>
=======
            <div key={message.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className={`text-base leading-relaxed ${
                message.role === 'user' 
                  ? 'text-white/90 font-medium' 
                  : 'text-white/75 pl-8 border-l border-white/5 italic'
              }`}>
                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap font-light tracking-wide">
                  {message.text}
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
                </div>
              </div>

              {message.cards && message.cards.length > 0 && (
<<<<<<< HEAD
                <div className="w-full mt-4">
=======
                <div className="w-full">
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
                  {message.cards.map((card, i) => {
                    if (card.type === 'project') {
                      return <ProjectCard key={i} project={card.content} />;
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
<<<<<<< HEAD
            <div className="flex items-center space-x-3 pl-8 py-4">
              <div className="flex space-x-2 bg-[#151515] border border-[#2A2A2A] rounded-2xl px-5 py-3 shadow-lg">
                <div className="w-2.5 h-2.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2.5 h-2.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2.5 h-2.5 bg-[#0066FF] rounded-full animate-bounce" />
              </div>
=======
            <div className="flex items-center space-x-1.5 pl-8 py-2 opacity-30">
              <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
            </div>
          )}
        </div>
      </div>

      {/* Floating Input Area */}
<<<<<<< HEAD
      <div className="fixed bottom-0 left-0 right-0 h-48 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent">
        <div className="max-w-2xl mx-auto px-6 h-full flex items-center justify-center">
          <div className="w-full border-t-2 border-[#2A2A2A]/60">
            <form 
              onSubmit={handleSubmit}
              className="w-full flex items-center gap-4 pt-6 pointer-events-auto"
            >
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  autoFocus
                  className="w-full bg-[#151515] border-2 border-[#2A2A2A] focus:border-[#0066FF]/50 rounded-3xl px-6 py-4 text-base font-normal focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 caret-[#0066FF] transition-all shadow-lg"
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] disabled:bg-[#1A1A1A] disabled:border-2 disabled:border-[#2A2A2A] flex items-center justify-center shadow-2xl shadow-blue-500/40 disabled:shadow-none transition-all disabled:opacity-40 hover:scale-105 active:scale-95"
              >
                {!isTyping ? (
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                  >
                    <path 
                      d="M2 10L18 2L11 18L9 11L2 10Z" 
                      fill="white" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
              </button>
            </form>
          </div>
=======
      <div className="fixed bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent">
        <div className="max-w-2xl mx-auto px-6 h-full flex items-center justify-center">
          <form 
            onSubmit={handleSubmit}
            className="w-full flex items-center pointer-events-auto"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something real."
              autoFocus
              className="w-full bg-transparent border-none py-6 text-lg font-light focus:outline-none focus:ring-0 text-white placeholder-white/10 caret-white"
            />
          </form>
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

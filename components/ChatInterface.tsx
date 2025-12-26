
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';
import { sendMessageToPortal } from '../services/geminiService';
import ProjectCard from './ProjectCard';

const STORAGE_HISTORY_PREFIX = 'portal_history_';
const NOTION_KEY = 'portal_notion_config';

interface ChatInterfaceProps {
  userId?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotionConfig, setShowNotionConfig] = useState(false);
  const [notionConfig, setNotionConfig] = useState({ token: '', databaseId: '' });
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const historyKey = userId ? `${STORAGE_HISTORY_PREFIX}${userId}` : null;

  // Initial Load
  useEffect(() => {
    if (historyKey) {
      const savedHistory = localStorage.getItem(historyKey);
      if (savedHistory) {
        try {
          const parsed = JSON.parse(savedHistory);
          if (Array.isArray(parsed)) setMessages(parsed);
          else setMessages([]);
        } catch (e) { 
          console.error(e);
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }

    const savedNotion = localStorage.getItem(NOTION_KEY);
    if (savedNotion) {
      try {
        setNotionConfig(JSON.parse(savedNotion));
      } catch (e) { console.error(e); }
    }
  }, [userId, historyKey]);

  // Sync with Storage
  useEffect(() => {
    if (historyKey && messages.length >= 0) {
      localStorage.setItem(historyKey, JSON.stringify(messages));
    }
  }, [messages, historyKey]);

  // Robust Auto-Scrolling Logic
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesEndRef.current) {
      // Use requestAnimationFrame to ensure the DOM has updated
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ 
          behavior, 
          block: 'end' 
        });
      });
    }
  };

  // Multiple triggers for scrolling to handle different rendering stages
  useEffect(() => {
    scrollToBottom('smooth');
    const t1 = setTimeout(() => scrollToBottom('smooth'), 100);
    const t2 = setTimeout(() => scrollToBottom('smooth'), 500); // Catch delayed markdown rendering
    return () => { clearTimeout(t1); clearTimeout(t2); };
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

  const saveNotion = () => {
    localStorage.setItem(NOTION_KEY, JSON.stringify(notionConfig));
    setShowNotionConfig(false);
  };

  const handleReset = () => {
    if (window.confirm("Dissolve this session history?")) {
      setMessages([]);
      if (historyKey) {
        localStorage.removeItem(historyKey);
      }
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full px-6 relative">
      {/* Notion Synapse Button */}
      <button 
        onClick={() => setShowNotionConfig(true)}
        className="fixed bottom-8 left-8 z-30 transition-all duration-700 hover:scale-110"
        title="Synapse Config"
      >
        <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${
          notionConfig.token && notionConfig.databaseId 
            ? 'bg-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
            : 'bg-white/10'
        }`} />
      </button>

      {/* Synapse Config Modal */}
      {showNotionConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6 animate-in fade-in duration-500">
          <div className="w-full max-w-sm bg-[#111] p-10 border border-white/[0.03] rounded-3xl shadow-2xl">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8 font-black">Synapse Interface</h2>
            <div className="space-y-6">
              <div>
                <label className="text-[8px] uppercase tracking-widest text-white/20 mb-2 block">Notion Integration Token</label>
                <input 
                  type="password" 
                  placeholder="secret_..."
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-xs focus:ring-1 focus:ring-white/10 outline-none text-white transition-all"
                  value={notionConfig.token}
                  onChange={e => setNotionConfig({...notionConfig, token: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[8px] uppercase tracking-widest text-white/20 mb-2 block">Database Identification</label>
                <input 
                  type="text" 
                  placeholder="32-character ID"
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-xs focus:ring-1 focus:ring-white/10 outline-none text-white transition-all"
                  value={notionConfig.databaseId}
                  onChange={e => setNotionConfig({...notionConfig, databaseId: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-12">
              <button onClick={() => setShowNotionConfig(false)} className="text-[9px] uppercase tracking-[0.3em] text-white/20 hover:text-white/40 transition-colors">Discard</button>
              <button onClick={saveNotion} className="bg-white/5 hover:bg-white/10 text-white/80 px-6 py-3 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold transition-all">Initialize</button>
            </div>
          </div>
        </div>
      )}

      {/* Global Controls */}
      {messages.length > 0 && (
        <button 
          onClick={handleReset}
          className="fixed top-8 right-8 z-30 text-[9px] uppercase tracking-[0.5em] text-white/10 hover:text-white/40 transition-all font-black"
        >
          Reset
        </button>
      )}

      {/* Scrollable Message Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pt-[35vh] pb-64"
      >
        <div className="space-y-24">
          {messages.length === 0 && (
            <div className="animate-in fade-in duration-3000">
               <div className="text-white/20 text-sm font-light italic pl-12 border-l border-white/[0.05] tracking-[0.05em] leading-relaxed">
                {userId ? (
                  <>
                    Welcome back, {userId}.<br/>
                    I've been keeping this space ready for you.<br/>
                    What's on your mind today?
                  </>
                ) : (
                  <>
                    Identity is the first step toward connection.<br/>
                    Identify above so we can begin our conversation.
                  </>
                )}
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div key={message.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
              <div className={`text-base leading-relaxed ${
                message.role === 'user' 
                  ? 'text-white/85 font-medium tracking-tight mb-8 ml-4' 
                  : 'text-white/50 pl-12 border-l border-white/[0.05] font-light tracking-wide'
              }`}>
                <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-li:my-3">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>

              {message.cards && message.cards.length > 0 && (
                <div className="w-full mt-12 px-2">
                  {message.cards.map((card, i) => (
                    card.type === 'project' ? <ProjectCard key={i} project={card.content} /> : null
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-4 pl-12 py-8 opacity-10">
              <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-white rounded-full animate-pulse [animation-delay:300ms]" />
              <div className="w-1 h-1 bg-white rounded-full animate-pulse [animation-delay:600ms]" />
            </div>
          )}
          
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Fixed Input Interface */}
      <div className="fixed bottom-0 left-0 right-0 h-64 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent z-20">
        <div className="max-w-2xl mx-auto px-6 h-full flex flex-col justify-center">
          <form 
            onSubmit={handleSubmit}
            className="w-full flex items-center pointer-events-auto"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={userId ? "Speak freely..." : "Establish identity to talk."}
              disabled={!userId}
              autoFocus
              className="w-full bg-transparent border-none py-10 text-2xl font-extralight focus:outline-none focus:ring-0 text-white placeholder-white/[0.05] caret-white transition-all tracking-tight disabled:opacity-20"
            />
          </form>
          <div className="text-[7px] uppercase tracking-[0.8em] text-white/[0.05] mt-[-35px] ml-1 font-black">
            {userId ? `Connected: ${userId}` : 'Awaiting Connection'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

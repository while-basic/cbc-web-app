
import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onTagClick?: (tag: string, projectName: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onTagClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
        relative overflow-hidden
<<<<<<< HEAD
        bg-gradient-to-br from-[#151515] to-[#0F0F0F] border-2 border-[#2A2A2A]
        rounded-3xl my-10 transition-all duration-500 ease-out cursor-pointer
        hover:border-[#0066FF]/30 hover:shadow-2xl hover:shadow-blue-500/10
        ${isExpanded ? 'p-8' : 'p-6'}
        group shadow-2xl backdrop-blur-sm
      `}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <h3 className={`font-bold tracking-tight transition-all duration-300 ${
            isExpanded ? 'text-2xl text-white' : 'text-xl text-white'
          }`}>
            {project.name}
          </h3>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#0066FF] font-black bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
            {project.status.split(' ')[0]}
          </span>
=======
        bg-white/[0.02] border border-white/[0.03] 
        rounded-lg my-3 transition-all duration-500 ease-out cursor-pointer
        hover:bg-white/[0.04] hover:border-white/[0.08]
        ${isExpanded ? 'p-6 bg-white/[0.03]' : 'p-3'}
        group
      `}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <h3 className={`font-medium tracking-tight transition-all duration-300 ${isExpanded ? 'text-lg text-white' : 'text-[11px] text-white/40 uppercase tracking-[0.2em]'}`}>
            {project.name}
          </h3>
          <div className="flex items-center space-x-2">
            {!isExpanded && (
              <span className="text-[8px] text-white/10 uppercase tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity">
                Details
              </span>
            )}
            <div className={`w-1 h-1 rounded-full transition-all duration-500 ${isExpanded ? 'bg-blue-400' : 'bg-white/10'}`} />
          </div>
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
        </div>
        
        {isExpanded && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-500">
<<<<<<< HEAD
            <p className="text-[#D0D0D0] text-[15px] leading-relaxed font-light mb-6" style={{ lineHeight: '1.7' }}>
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
=======
            <p className="text-white/60 text-sm leading-relaxed font-light mb-6">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
              {project.tech.map((t, i) => (
                <button 
                  key={i} 
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagClick?.(t, project.name);
                  }}
<<<<<<< HEAD
                  className="text-xs font-mono text-[#B0B0B0] bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-2 rounded-lg hover:border-[#0066FF]/30 transition-colors"
=======
                  className="text-[9px] font-mono tracking-widest text-white/30 bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded-sm hover:border-white/20 transition-all"
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
                >
                  {t}
                </button>
              ))}
            </div>
            
<<<<<<< HEAD
            <div className="pt-6 border-t-2 border-[#2A2A2A] flex items-center justify-between">
              <span className="text-[11px] text-[#808080] font-mono tracking-wider">{project.status}</span>
              <button className="text-[11px] text-[#0066FF] group-hover:text-[#0088FF] transition-colors uppercase tracking-[0.3em] font-bold flex items-center gap-2">
                Collapse
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6H10M2 6L5 3M2 6L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
=======
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[9px] text-white/20 font-mono italic">{project.status}</span>
              <button className="text-[8px] uppercase tracking-[0.3em] text-white/10 hover:text-white/40 transition-all">Collapse</button>
>>>>>>> c5852787698c13ce07da0d9357cc236b6527617f
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;


import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
        relative overflow-hidden
        bg-[#111111] rounded-2xl my-10 transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) cursor-pointer
        border border-white/[0.03] hover:border-white/[0.08]
        ${isExpanded 
          ? 'p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] scale-[1.01] bg-[#141414]' 
          : 'p-8 shadow-sm hover:bg-[#161616] scale-100'
        }
        group
      `}
    >
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 bg-white/[0.01] transition-opacity duration-700 ${isExpanded ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative z-10">
        <div className="flex justify-between items-baseline mb-5">
          <h3 className={`font-semibold tracking-tighter transition-all duration-700 ${isExpanded ? 'text-2xl text-white' : 'text-lg text-white/85'}`}>
            {project.name}
          </h3>
          <div className="flex items-center space-x-3">
             <span className={`text-[8px] uppercase tracking-[0.4em] font-black transition-all duration-700 ${isExpanded ? 'text-white/40' : 'text-white/10 group-hover:text-white/30'}`}>
              {project.status.split(' ')[0]}
            </span>
            <div className={`w-1 h-1 rounded-full transition-all duration-700 ${isExpanded ? 'bg-white/40 animate-pulse' : 'bg-white/5'}`} />
          </div>
        </div>
        
        <p className={`text-white/50 leading-relaxed font-light transition-all duration-700 ${isExpanded ? 'text-lg mb-10 text-white/70' : 'text-sm mb-4 line-clamp-2'}`}>
          {project.description}
        </p>
        
        {/* Seamless Expansion Container using Grid trick */}
        <div className={`grid transition-[grid-template-rows,opacity,margin] duration-700 cubic-bezier(0.23, 1, 0.32, 1) ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-3 mb-10 pt-2">
              {project.tech.map((t, i) => (
                <span key={i} className="text-[9px] font-mono tracking-widest text-white/30 bg-white/[0.01] border border-white/[0.03] px-3 py-1 rounded-full hover:border-white/10 hover:text-white/50 transition-colors">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="pt-8 border-t border-white/[0.03] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[7px] uppercase tracking-[0.5em] text-white/15 mb-2 font-bold">Project State</span>
                <span className="text-[10px] text-white/40 font-mono tracking-tight">{project.status}</span>
              </div>
              <div className="flex items-center space-x-2 text-[9px] text-white/20 uppercase tracking-[0.3em] font-black group-hover:text-white/40 transition-all">
                <span>Retract</span>
                <div className="w-4 h-[1px] bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        {!isExpanded && (
          <div className="flex items-center space-x-4 mt-2">
             <div className="h-[1px] w-8 bg-white/[0.02] group-hover:w-12 group-hover:bg-white/[0.08] transition-all duration-700" />
             <div className="text-[8px] text-white/[0.08] uppercase tracking-[0.4em] font-black group-hover:text-white/30 transition-all duration-700">
              Expand Consciousness
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;

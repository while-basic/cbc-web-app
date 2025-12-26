
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-gradient-to-br from-[#151515] to-[#0F0F0F] border-2 border-[#2A2A2A] rounded-3xl p-8 my-10 shadow-2xl transition-all hover:border-[#0066FF]/30 hover:shadow-blue-500/10 group backdrop-blur-sm">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'system-ui, -apple-system' }}>
          {project.name}
        </h3>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#0066FF] font-black bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
          {project.status.split(' ')[0]}
        </span>
      </div>
      
      <p className="text-[#D0D0D0] text-[15px] leading-relaxed mb-6 font-light" style={{ lineHeight: '1.7' }}>
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-3 mb-8">
        {project.tech.map((t, i) => (
          <span 
            key={i} 
            className="text-xs font-mono text-[#B0B0B0] bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-2 rounded-lg hover:border-[#0066FF]/30 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
      
      <div className="pt-6 border-t-2 border-[#2A2A2A] flex items-center justify-between">
        <span className="text-[11px] text-[#808080] font-mono tracking-wider">{project.status}</span>
        <button className="text-[11px] text-[#0066FF] group-hover:text-[#0088FF] transition-colors uppercase tracking-[0.3em] font-bold flex items-center gap-2">
          Details
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

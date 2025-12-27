/**
 * ProjectListCard Component
 *
 * Renders a list of projects in a compact, organized view
 * Used when displaying multiple projects together
 */

import React from 'react';
import { ProjectListCard as ProjectListCardType } from '../types';

interface ProjectListCardProps {
  projectList: ProjectListCardType;
}

const ProjectListCard: React.FC<ProjectListCardProps> = ({ projectList }) => {
  const categoryColors = {
    research: 'bg-blue-500/10 text-blue-300/70',
    product: 'bg-green-500/10 text-green-300/70',
    music: 'bg-purple-500/10 text-purple-300/70',
    company: 'bg-orange-500/10 text-orange-300/70'
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      {projectList.title && (
        <h3 className="text-white font-light text-lg mb-4">{projectList.title}</h3>
      )}

      <div className="space-y-3">
        {projectList.projects.map((project, i) => (
          <div
            key={i}
            className="bg-white/5 rounded p-4 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="text-white font-light text-base">{project.name}</h4>
              {project.category && (
                <span className={`px-2 py-1 rounded text-xs flex-shrink-0 ${categoryColors[project.category]}`}>
                  {project.category}
                </span>
              )}
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-2">
              {project.description}
            </p>

            <div className="text-white/40 text-xs">{project.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectListCard;

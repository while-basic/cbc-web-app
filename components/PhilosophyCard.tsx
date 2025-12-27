/**
 * PhilosophyCard Component
 *
 * Renders a formatted explanation of Christopher's philosophy or approach
 * Displays methodology, examples, and related projects
 */

import React from 'react';
import { PhilosophyCard as PhilosophyCardType } from '../types';

interface PhilosophyCardProps {
  philosophy: PhilosophyCardType;
}

const PhilosophyCard: React.FC<PhilosophyCardProps> = ({ philosophy }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h3 className="text-white font-light text-lg mb-3">{philosophy.title}</h3>

      <p className="text-white/70 text-sm leading-relaxed mb-4">
        {philosophy.description}
      </p>

      {philosophy.examples && philosophy.examples.length > 0 && (
        <div className="mb-4">
          <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Examples</div>
          <ul className="space-y-2">
            {philosophy.examples.map((example, i) => (
              <li key={i} className="text-white/60 text-sm leading-relaxed">
                • {example}
              </li>
            ))}
          </ul>
        </div>
      )}

      {philosophy.related_projects && philosophy.related_projects.length > 0 && (
        <div>
          <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Related Projects</div>
          <div className="flex flex-wrap gap-2">
            {philosophy.related_projects.map((project, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white/10 rounded text-white/70 text-xs"
              >
                {project}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhilosophyCard;

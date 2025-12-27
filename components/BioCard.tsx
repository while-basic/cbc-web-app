/**
 * BioCard Component
 *
 * Renders biographical information card
 * Displays background, location, expertise, and highlights
 */

import React from 'react';
import { BioCard as BioCardType } from '../types';

interface BioCardProps {
  bio: BioCardType;
}

const BioCard: React.FC<BioCardProps> = ({ bio }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <div className="space-y-4">
        <div>
          <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Current Role</div>
          <div className="text-white font-light text-base">{bio.current_role}</div>
        </div>

        <div>
          <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Location</div>
          <div className="text-white/60 text-sm">{bio.location}</div>
        </div>

        <div>
          <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Expertise</div>
          <div className="flex flex-wrap gap-2">
            {bio.expertise.map((item, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white/10 rounded text-white/70 text-xs font-light"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {bio.highlights && bio.highlights.length > 0 && (
          <div>
            <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Highlights</div>
            <ul className="space-y-1">
              {bio.highlights.map((highlight, i) => (
                <li key={i} className="text-white/60 text-sm leading-relaxed">
                  • {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BioCard;

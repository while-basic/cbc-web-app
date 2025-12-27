/**
 * MediaCard Component
 *
 * Renders a media player card for music or video content
 * Displays playable content inline with metadata
 */

import React from 'react';
import { MediaCard as MediaCardType } from '../types';

interface MediaCardProps {
  media: MediaCardType;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded flex items-center justify-center">
          <span className="text-white/60 text-lg">
            {media.type === 'music' ? '♪' : '▶'}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-light text-lg mb-1">{media.title}</h3>

          {media.artist && (
            <p className="text-white/60 text-sm mb-2">{media.artist}</p>
          )}

          {media.description && (
            <p className="text-white/40 text-sm leading-relaxed mb-3">
              {media.description}
            </p>
          )}

          {media.project && (
            <div className="inline-block px-2 py-1 bg-white/5 rounded text-white/50 text-xs">
              {media.project}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;

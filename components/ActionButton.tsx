/**
 * ActionButton Component
 *
 * Renders an action button that suggests a next step
 * Provides clear call-to-action for user engagement
 */

import React from 'react';
import { ActionCard } from '../types';

interface ActionButtonProps {
  action: ActionCard;
}

const ActionButton: React.FC<ActionButtonProps> = ({ action }) => {
  const actionIcons = {
    navigate: '→',
    play: '▶',
    expand: '↓',
    learn_more: '→'
  };

  return (
    <button
      className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-3 transition-all group flex items-center gap-2 w-full"
      aria-label={action.label}
    >
      <span className="text-white font-light text-sm flex-1 text-left">
        {action.label}
      </span>
      <span className="text-white/60 group-hover:text-white/80 transition-colors">
        {actionIcons[action.action]}
      </span>
    </button>
  );
};

export default ActionButton;

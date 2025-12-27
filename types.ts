
export interface User {
  id: string;
  name: string;
}

export interface Project {
  name: string;
  description: string;
  status: string;
  tech: string[];
}

// KnowledgeBase type matches the full structure from @knowledgebase/christopher_celaya_knowledge_base.json
// Using flexible types to accommodate the comprehensive knowledgebase structure
export interface KnowledgeBase {
  bio: {
    name?: string;
    current_role: string;
    experience: string;
    identity: string;
    location: string;
    background?: {
      education?: string[];
      professional_history?: string[];
      expertise_domains?: string[];
    };
    cognitive_architecture?: {
      thinking_style?: string;
      strength?: string;
      approach?: string;
      methodology?: string;
      perspective?: string;
    };
  };
  active_projects: Project[];
  philosophy: {
    approach: string;
    methodology: string;
    perspective?: string;
    research_style?: string;
    core_principle?: string;
    recognition_seeking?: string;
    intellectual_goal?: string;
    work_philosophy?: string;
  };
  upcoming?: {
    celaya_solutions?: string;
    focus?: string;
    celaya_solutions_launch?: string;
    neural_child_release?: string;
    research_publication?: string;
  };
  celaya_solutions?: any;
  expertise?: any;
  cognitive_patterns?: any;
  research_interests?: any;
  music_projects?: any;
  mental_artifacts?: any;
  communication_style?: any;
}

// Extended card types for all Claude functions
export type CardType = 'project' | 'media' | 'bio' | 'project_list' | 'action' | 'philosophy';

export interface ProjectCard {
  name: string;
  description: string;
  status: string;
  tech: string[];
  key_features?: string[];
  research_focus?: string;
}

export interface MediaCard {
  type: 'music' | 'video';
  title: string;
  description?: string;
  project?: string;
  artist?: string;
}

export interface BioCard {
  current_role: string;
  location: string;
  expertise: string[];
  highlights?: string[];
}

export interface ProjectListCard {
  projects: Array<{
    name: string;
    description: string;
    status: string;
    category?: 'research' | 'product' | 'music' | 'company';
  }>;
  title?: string;
}

export interface ActionCard {
  label: string;
  action: 'navigate' | 'play' | 'expand' | 'learn_more';
  target: string;
}

export interface PhilosophyCard {
  title: string;
  description: string;
  examples?: string[];
  related_projects?: string[];
}

export interface CardData {
  type: CardType;
  content: ProjectCard | MediaCard | BioCard | ProjectListCard | ActionCard | PhilosophyCard;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  cards?: CardData[];
  id: string;
  parentId?: string;
}

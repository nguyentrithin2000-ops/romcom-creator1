export type Screen = "landing" | "creation" | "story";

export interface TemplateOption {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  quickPrompt: string;
}

export interface CreationFormState {
  worldDescription: string;
  heroineName: string;
  heroineArchetype: string;
  firstMeeting: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  archetype: string;
  affection: number;
  memories: string[];
}

export interface StoryChoice {
  id: string;
  label: string;
  affectionDelta: Record<string, number>;
  haoCamDelta: number;
  heartbeatCost: number;
}

export interface StoryBeat {
  id: string;
  chapter: number;
  title: string;
  narrator: string;
  choices: StoryChoice[];
}

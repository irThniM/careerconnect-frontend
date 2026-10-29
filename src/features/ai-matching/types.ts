export interface MatchExplanation {
  totalScore: number;
  semanticScore: number;
  skillScore: number;
  experienceScore: number;
  educationScore: number;
  locationScore: number;
  workModeScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  explanation?: string;
}

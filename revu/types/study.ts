export type StudySet = {
    id: string;
    title: string;
    description: string | null;
    isPublic: boolean;
    userId: string;
    tags: string[] | null;
    createdAt: string;
    updatedAt: string;
    flashcardCount?: number;
  };
  
  export type Flashcard = {
    id: string;
    studySetId: string;
    front: string;
    back: string;
    position: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type SRSProgress = {
    id: string;
    userId: string;
    flashcardId: string;
    nextReviewDate: string;
    difficultyLevel: number;
    timesReviewed: number;
    createdAt: string;
    updatedAt: string;
  };
  
  export type StudySession = {
    id: string;
    userId: string;
    studySetId: string;
    durationSeconds: number;
    cardsReviewed: number;
    correctAnswers: number;
    studyMode: 'flashcards' | 'quiz' | 'match';
    createdAt: string;
  };
  
  export type StudyMode = 'flashcards' | 'quiz' | 'match';
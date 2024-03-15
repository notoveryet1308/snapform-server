export enum PLAYER_ACTION {
  playerOnboarding = "player-onboarding",
  playerOnboarded = "player-onboarded",
  bulkPlayerOnboarded = "bulk-player-onboarding",
  playerQuestionResponse = "player-question-response",
}

export enum ADMIN_ACTION {
  adminOnboarding = "admin-onboarding",
  adminOnboarded = "admin-onboarded",
}

export enum ADMIN_GAME_ACTION {
  PLAY_GAME = "PLAY_GAME",
  PAUSE_GAME = "PAUSE_GAME",
  SKIP_QUESTION = "SKIP_QUESTION",
}

export enum GAME_COUNT_DOWN {
  START = "count-down-start",
  DONE = "count-down-done",
  IN_PROGRESS = "count-down-in-progress",
}

export enum GAME_QUESTIONS {
  SENDING_QUESTION = "SENDING_QUESTION",
  SEND_QUESTION = "SEND_QUESTION",
  PAUSE = "PAUSE",
  SKIP = "SKIP",
  QUESTION_ITEM = "QUESTION_ITEM",
}

export interface PlayerDataType {
  id: string;
  name: string;
  avatar?: string;
  isAdmin?: boolean;
}

export type playerOnboarding = {
  action: PLAYER_ACTION.playerOnboarding;
  payload: PlayerDataType;
};

export type playerOnboarded = {
  action: PLAYER_ACTION.playerOnboarded;
  payload: PlayerDataType;
};

export type bulkPlayerOnboarded = {
  action: PLAYER_ACTION.bulkPlayerOnboarded;
  payload: PlayerDataType[];
};

export type messageFormat<T> = {
  action: string;
  payload: T;
};

export interface CustomErrorType extends Error {
  statusCode?: number;
  status?: string;
  isOptional?: boolean;
}

export enum ALL_QUESTION_TYPES {
  MULTI_SELECT = "multi-select",
  YES_NO_SELECT = "yes-no-select",
  SINGLE_SELECT = "single-select",
}

export interface QuestionOptionType {
  order: string;
  label: string;
  isCorrectChoice: boolean;
}

export interface QuizQuestionDataServerType {
  id: string;
  questionType: ALL_QUESTION_TYPES;
  title: string;
  description: string;
  options: QuestionOptionType[];
  timeLimit: number;
  point: number;
}

export interface LiveQuizDataType {
  id: string;
  title: string;
  questions: QuizQuestionDataServerType[];
  createdAt: string;
  isLiveQuiz: boolean;
}

export interface QuestionResponseDataType {
  questionId: string;
  playerResponse: {
    playerId: string;
    name: string;
    value: QuestionOptionType[];
    responseTime?: number;
  }[];
}

export interface GameResponseDataType {
  quizId: string;
  joinedPlayer: PlayerDataType[];
  livePlayer: PlayerDataType[];
  questions: QuestionResponseDataType[];
}

export enum QUIZ_DATA_ACTION {
  SEND_QUIZ_DATA = "SEND_QUIZ_DATA",
  LIVE_QUIZ_ID = "LIVE_QUIZ_ID",
  IS_QUIZ_LIVE = "IS_QUIZ_LIVE",
}

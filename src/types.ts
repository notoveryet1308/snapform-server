export enum PLAYER_ACTION {
  PLAYER_ONBOARDING = "PLAYER_ONBOARDING",
  PLAYER_ONBOARDED = "PLAYER_ONBOARDED",
  PLAYER_QUESTION_RESPONSE = "PLAYER_QUESTION_RESPONSE",
  PLAYER_DISCONNECTED = "PLAYER_DISCONNECTED",
}

export enum ADMIN_ACTION {
  ADMIN_ONBOARDING = "ADMIN_ONBOARDING",
  ADMIN_ONBOARDED = "ADMIN_ONBOARDED",
  PLAYER_BULK_ONBOARDING_TO_ADMIN = "PLAYER_BULK_ONBOARDING_TO_ADMIN",
  ADMIN_QUESTION_RESPONSE = "ADMIN_QUESTION_RESPONSE",
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

export type PlayerOnboardingType = {
  action: PLAYER_ACTION.PLAYER_ONBOARDING;
  payload: PlayerDataType;
};

export type PlayerOnboardedType = {
  action: PLAYER_ACTION.PLAYER_ONBOARDED;
  payload: PlayerDataType;
};

export type BulkPlayerOnboardToAdminType = {
  action: ADMIN_ACTION.PLAYER_BULK_ONBOARDING_TO_ADMIN;
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

// export interface QuestionResponseDataType {
//   questionId: string;
//   playerResponse: {
//     playerId: string;
//     name: string;
//     value: QuestionOptionType[];
//     responseTime?: number;
//   }[];
// }

export interface GameResultDataType {
  player: PlayerDataType;
  score: number;
}

export interface GameResponseDataType {
  quizId: string;
  joinedPlayer: PlayerDataType[];
  livePlayer: PlayerDataType[];
  questions: PlayerQuizQuestionResponseDataType[];
  result: GameResultDataType[];
}

export enum QUIZ_DATA_ACTION {
  JOINED_PLAYER = "JOINED_PLAYER",
  SEND_QUIZ_DATA = "SEND_QUIZ_DATA",
  LIVE_QUIZ_ID = "LIVE_QUIZ_ID",
  IS_QUIZ_LIVE = "IS_QUIZ_LIVE",
  SEND_NEXT_QUESTION = "SEND_NEXT_QUESTION",
  QUIZ_OVER = "QUIZ_OVER",
  SHOW_OUTCOME = "SHOW_OUTCOME",
  SHOW_FINAL_OUTCOME = "SHOW_FINAL_OUTCOME",
}

export interface OptionResponseDataType extends QuestionOptionType {
  isSelected: boolean;
}

export interface PlayerQuizQuestionResponseDataType {
  player: PlayerDataType;
  quizId: string;
  questionId: string;
  selectedOption: OptionResponseDataType[] | OptionResponseDataType | [];
  point: number;
  responseTime: number;
}

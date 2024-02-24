export enum PLAYER_ACTION {
  playerOnboarding = "player-onboarding",
  playerOnboarded = "player-onboarded",
  bulkPlayerOnboarded = "bulk-player-onboarding",
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

export type playerProfile = {
  id: string;
  name: string;
  avatar: string;
};

export type playerOnboarding = {
  action: PLAYER_ACTION.playerOnboarding;
  payload: playerProfile;
};

export type playerOnboarded = {
  action: PLAYER_ACTION.playerOnboarded;
  payload: playerProfile;
};

export type bulkPlayerOnboarded = {
  action: PLAYER_ACTION.bulkPlayerOnboarded;
  payload: playerProfile[];
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

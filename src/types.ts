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

export enum PLAYER_ACTION {
  playerOnboarding = "player-onboarding",
  playerOnboarded = "player-onboarded",
  bulkPlayerOnboarded = "bulk-player-onboarding",
}

export enum ADMIN_ACTION {
  adminOnboarding = "admin-onboarding",
  adminOnboarded = "admin-onboarded",
  startGame = "play-game",
  pauseGame = "pause-game",
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

export type messageFormat = {
  action: string;
  payload: Object;
};

export enum USER_ACTION {
  userOnboarding = "user-onboarding",
  userOnboarded = "user-onboarded",
}
export type userProfile = {
  id: string;
  name: string;
};

export type userOnboarding = {
  action: USER_ACTION.userOnboarding;
  payload: { name: string };
};

export type userOnboarded = {
  action: USER_ACTION.userOnboarded;
  payload: userProfile;
};

export type bulkUserOnboarded = {
  action: USER_ACTION.userOnboarded;
  payload: userProfile[];
};

export type messageFormat = {
  action: string;
  payload: Object;
};

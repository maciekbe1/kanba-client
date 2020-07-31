// src/store/chat/types.ts
export const SIGNIN_USER = "SIGNIN_USER";
export const SIGNOUT_USER = "SIGNOUT_USER";

interface LoginUserAction {
  type: typeof SIGNIN_USER;
  isAuth: boolean;
  data: any;
  token: string;
  byGoogle: boolean;
}

interface LogoutUserAction {
  type: typeof SIGNOUT_USER;
  data: any;
}

export type UserTypes = LogoutUserAction | LoginUserAction;

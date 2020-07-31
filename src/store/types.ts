// src/store/chat/types.ts
export const SIGNIN_USER = "SIGNIN_USER";
export const SIGNOUT_USER = "SIGNOUT_USER";
export const SET_CARDS_LOADED = "SET_CARDS_LOADED";

interface LoginUserAction {
  type: typeof SIGNIN_USER;
  isAuth: boolean;
  data: any;
  token: string;
  byGoogle: boolean;
}
interface CardsLoadedAction {
  type: typeof SET_CARDS_LOADED;
  isCardsLoaded: boolean;
}

export type UserTypes = LoginUserAction;
export type CardsTypes = CardsLoadedAction;

const INITIAL_DATA = {
  isAuth: false,
  data: null,
  token: null
};
export default (state: any = INITIAL_DATA, action: any) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return {
        ...state,
        isAuth: action.isAuth,
        data: action.data,
        token: action.token
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        isAuth: false,
        data: null,
        token: null
      };
    default:
      return state;
  }
};

import Cookies from "js-cookie";

export const signOut = () => async dispatch => {
  Cookies.remove("token");
  localStorage.removeItem("persist:root");
  dispatch({
    type: "SET_CARDS_STATE",
    cardsState: null
  });
  dispatch({
    type: "SIGNOUT_USER"
  });
};
export const signIn = payload => {
  return {
    type: "SIGNIN_USER",
    isAuth: payload.isAuth,
    data: payload.data
  };
};

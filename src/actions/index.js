import * as API from "api/API";
import Cookies from "js-cookie";

export const setTabValue = tabValue => {
  return {
    type: "DRAWER_TAB_VALUE",
    tabValue: tabValue
  };
};
export const setDarkTheme = darkTheme => {
  return {
    type: "DARK_THEME",
    darkTheme: darkTheme
  };
};
export const signOut = () => {
  Cookies.remove("token");
  return {
    type: "SIGNOUT_USER"
  };
};
export const signIn = ({ token, isAuth }) => async dispatch => {
  return await API.requestToken(
    `${process.env.REACT_APP_SERVER}/api/users/me`,
    token
  )
    .then(res => {
      Cookies.set("token", token);
      return dispatch({
        type: "SIGNIN_USER",
        isAuth: isAuth,
        data: res.data
      });
    })
    .catch(err => {
      alert("Wystąpił błąd, zaloguj sie ponownie.");
      dispatch({
        type: "SIGNIN_USER",
        isAuth: false,
        data: null
      });
      console.log(err.response.data);
    });
};

import * as API from "api/API";
import Cookies from "js-cookie";

export const signOut = () => async dispatch => {
  Cookies.remove("token");
  localStorage.removeItem("persist:root");
  dispatch({
    type: "SET_CARDS_STATE",
    todoState: null
  });
  dispatch({
    type: "SIGNOUT_USER"
  });
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
      dispatch(signOut());
      console.log(err.response.data);
    });
};

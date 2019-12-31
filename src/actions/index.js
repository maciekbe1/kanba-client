import * as API from "../api/API";

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
    return {
        type: "SIGNOUT_USER"
    };
};
export const signIn = ({ token, isAuth }) => async dispatch => {
    return await API.requestToken(
        "https://kanba-app.herokuapp.com/api/users/me",
        token
    )
        .then(res => {
            return dispatch({
                type: "SIGNIN_USER",
                token: token,
                isAuth: isAuth,
                data: res.data
            });
        })
        .then(() => {
            window.location.assign(`/`);
        })
        .catch(err => {
            return dispatch({
                type: "SIGNIN_USER",
                token: null,
                isAuth: false,
                data: err.response.data
            });
        });
};

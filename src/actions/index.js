import * as API from "../api/API";

// export const signIn = ({ token, isAuth }) => {
//     return {
//         type: "SIGNIN_USER",
//         token: token,
//         isAuth: isAuth
//     };
// };
export const signOut = () => {
    return {
        type: "SIGNOUT_USER"
    };
};
export const signIn = ({ token, isAuth }) => async dispatch => {
    return await API.requestToken("http://localhost:4000/api/users/me", token)
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

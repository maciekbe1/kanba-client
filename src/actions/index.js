export const signIn = user => {
    return {
        type: "SIGNIN_USER",
        userID: user.userID,
        isAuth: user.isAuth
    };
};
export const signOut = () => {
    return {
        type: "SIGNOUT_USER"
    };
};

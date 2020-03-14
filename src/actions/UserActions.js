export const signOut = () => {
  return {
    type: "SIGNOUT_USER"
  };
};
export const signIn = payload => {
  return {
    type: "SIGNIN_USER",
    isAuth: payload.isAuth,
    data: payload.data,
    token: payload.token
  };
};

import * as API from "api/API";

export const signInService = (email, password) => {
  return API.request(`${process.env.REACT_APP_SERVER}/api/auth`, {
    email,
    password
  });
};

export const getMeService = token => {
  return API.requestToken(
    `${process.env.REACT_APP_SERVER}/api/users/me`,
    token
  );
};

export const signInGoogleService = token => {
  return API.request(`${process.env.REACT_APP_SERVER}/api/auth/googleSignIn`, {
    token
  });
};

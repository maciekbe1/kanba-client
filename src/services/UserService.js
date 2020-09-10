import * as API from "api/API";

export const signInService = (email, password) => {
  return API.request(`${process.env.REACT_APP_SERVER}/api/auth`, {
    email,
    password
  });
};

export const getMeService = () => {
  return API.request(
    `${process.env.REACT_APP_SERVER}/api/users/me`,
    null,
    "get"
  );
};

export const signInGoogleService = (token) => {
  return API.request(`${process.env.REACT_APP_SERVER}/api/auth/googleSignIn`, {
    token
  });
};

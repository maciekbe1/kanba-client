export default (state = { isAuth: false }, action) => {
    switch (action.type) {
        case "SIGNIN_USER":
            return {
                ...state,
                userID: action.userID,
                isAuth: action.isAuth
            };
        case "SIGNOUT_USER":
            return {
                ...state,
                userID: null,
                isAuth: false
            };
        default:
            return state;
    }
};

const INITIAL_DATA = {
    tabValue: 0,
    darkTheme: false
};
export default (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case "DRAWER_TAB_VALUE":
            return {
                ...state,
                tabValue: action.tabValue
            };
        case "DARK_THEME":
            return {
                ...state,
                darkTheme: action.darkTheme
            };
        default:
            return state;
    }
};

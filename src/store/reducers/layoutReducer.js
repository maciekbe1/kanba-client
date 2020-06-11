const INITIAL_DATA = {
  tabValue: 0,
  theme: false,
  backdrop: false,
  bar: {
    type: null,
    message: null,
    active: false
  }
};
export default (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case "DRAWER_TAB_VALUE":
      return {
        ...state,
        tabValue: action.tabValue
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.theme
      };
    case "BACKDROP":
      return {
        ...state,
        backdrop: action.backdrop
      };
    case "BAR":
      return {
        ...state,
        bar: action.bar
      };
    default:
      return state;
  }
};

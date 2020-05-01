export const setTabValue = tabValue => {
  return {
    type: "DRAWER_TAB_VALUE",
    tabValue: tabValue
  };
};
export const setTheme = theme => {
  return {
    type: "SET_THEME",
    theme: theme
  };
};
export const setBackdrop = backdrop => {
  return {
    type: "BACKDROP",
    backdrop
  };
};

export const setBar = bar => {
  return {
    type: "BAR",
    bar
  };
};

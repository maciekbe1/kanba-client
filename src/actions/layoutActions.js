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

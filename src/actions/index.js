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

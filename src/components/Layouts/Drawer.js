import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "actions/UserActions";
import { useSelector } from "react-redux";
import { setTabValue } from "actions";
import { setDarkTheme } from "actions";
import { checkAuth } from "actions/UserActions";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { findIndex } from "lodash";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MailIcon from "@material-ui/icons/Mail";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import { ViewDay, AlarmOn } from "@material-ui/icons";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Switch from "@material-ui/core/Switch";
const drawerWidth = 200;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    marginInlineStart: "auto",
    padding: "0px"
  },
  gutters: theme.mixins.gutters()
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const darkTheme = useSelector(state => state.layoutReducer.darkTheme);

  useEffect(() => {
    const check = () => {
      dispatch(checkAuth());
    };
    window.addEventListener("focus", check);
    return () => {
      window.removeEventListener("focus", check);
    };
  }, [dispatch]);

  const tabs = [
    { icon: <HomeIcon />, label: "Home", to: "/" },
    { icon: <ViewDay />, label: "Karty", to: "/cards" },
    { icon: <AlarmOn />, label: "Done", to: "/done" }
  ];
  const tabValue = findIndex(tabs, function(item) {
    return item.to === pathname;
  });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch(signOut());
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    dispatch(setTabValue(newValue));
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = () => {
    dispatch(setDarkTheme(!darkTheme));
  };

  const menuOpen = Boolean(anchorEl);
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        color={theme.palette.type === "dark" ? "default" : "primary"}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Tabs
            value={tabValue === -1 ? false : tabValue}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="icon label tabs example"
          >
            {tabs.map((item, index) => {
              return (
                <Tab
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  to={item.to}
                  component={Link}
                />
              );
            })}
          </Tabs>
          <IconButton
            aria-owns={menuOpen ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            className={classes.avatar}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={menuOpen}
            onClose={handleClose}
          >
            <MenuItem>
              Dark theme{" "}
              <Switch checked={darkTheme} onChange={handleThemeChange} />
            </MenuItem>
            <MenuItem onClick={logoutHandler}>Log out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Inbox", "Create", "Calendar"].map((text, index) => (
            <ListItem
              button
              key={text}
              classes={{
                gutters: classes.gutters
              }}
              component={Link}
              to={text.toLowerCase()}
            >
              <ListItemIcon>
                {(() => {
                  switch (text) {
                    case "Inbox":
                      return <MailIcon />;
                    case "Create":
                      return <AddCircleOutlineIcon />;
                    case "Calendar":
                      return <CalendarTodayIcon />;
                    default:
                      return null;
                  }
                })()}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Settings"].map((text, index) => (
            <ListItem
              button
              key={text}
              classes={{
                gutters: classes.gutters
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

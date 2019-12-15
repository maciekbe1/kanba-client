import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../actions";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
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
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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
        marginRight: 36
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
    paper: {
        background: theme.palette.primary,
        color: "white"
    },
    title: {
        flexGrow: 1
    },
    logo: {
        textDecoration: "none",
        color: "white"
    },
    gutters: theme.mixins.gutters()
}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const logoutHandler = () => {
        dispatch(signOut());
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(
                    classes.appBar,
                    {
                        [classes.appBarShift]: open
                    },
                    classes.paper
                )}
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
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.logo} to="/">
                            Kanba
                        </Link>
                    </Typography>
                    <Button color="inherit" onClick={logoutHandler}>
                        Logout
                    </Button>
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
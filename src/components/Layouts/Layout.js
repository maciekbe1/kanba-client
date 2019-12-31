import React from "react";
import Drawer from "./Drawer";
import AppBar from "./AppBar";

export default function Layout({ isAuth, children }) {
    if (isAuth) {
        return <Drawer>{children}</Drawer>;
    } else {
        return <AppBar>{children}</AppBar>;
    }
}

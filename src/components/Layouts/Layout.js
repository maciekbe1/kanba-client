import React, { useState, useEffect } from "react";

import Drawer from "./Drawer";
import AppBar from "./AppBar";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";

function initializeReactGA() {
  ReactGA.initialize(process.env.REACT_APP_TRACKING_ID, {
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
}
export default withRouter(function Layout({ isAuth, children, location }) {
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    const { pathname } = location;

    setCurrentPath(pathname);
    initializeReactGA(currentPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (isAuth) {
    return <Drawer>{children}</Drawer>;
  } else {
    return <AppBar>{children}</AppBar>;
  }
});

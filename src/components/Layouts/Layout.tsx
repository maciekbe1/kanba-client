import React, { useEffect } from "react";

import Drawer from "./Drawer";
import AppBar from "./AppBar";
import Bar from "components/Layouts/Bar";
import ReactGA from "react-ga";
import "../../assets/styles/global.scss";

interface Props {
  isAuth: boolean;
  children: any;
}

function initializeReactGA() {
  const trackingID: string = process.env.REACT_APP_TRACKING_ID!;
  ReactGA.initialize(trackingID, {
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
}
export default function Layout({ isAuth, children }: Props): JSX.Element {
  useEffect(() => {
    initializeReactGA();
  }, []);

  if (isAuth) {
    return (
      <Drawer>
        <Bar />
        {children}
      </Drawer>
    );
  } else {
    return (
      <AppBar>
        <Bar />
        {children}
      </AppBar>
    );
  }
}

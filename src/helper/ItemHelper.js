import React from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import { green, blue, grey } from "@material-ui/core/colors";
import { isNil } from "lodash";
class Status {
  constructor(color, icon, value, label) {
    this.color = color;
    this.icon = icon;
    this.value = value;
    this.label = label;
  }
}

export default {
  statusStyler(status) {
    if (isNil(status)) {
      const color = {
        background: "#fff",
        hover: "#fff",
        text: "default"
      };
      const icon = null;
      return new Status(color, icon, 0, "Brak");
    }
    switch (status.value) {
      case 0: {
        const color = {
          background: "#fff",
          hover: "#fff",
          text: "default"
        };
        const icon = null;
        return new Status(color, icon, 0, "Brak");
      }
      case 1: {
        const color = {
          background: grey[500],
          hover: grey[700],
          text: "primary"
        };
        const icon = <PauseCircleOutlineIcon />;
        return new Status(color, icon, status.value, status.label);
      }

      case 2: {
        const color = {
          background: blue[500],
          hover: blue[700],
          text: "primary"
        };
        const icon = <AvTimerIcon />;
        return new Status(color, icon, status.value, status.label);
      }

      case 3: {
        const color = {
          background: green[500],
          hover: green[700],
          text: "primary"
        };
        const icon = <CheckCircleOutlineIcon />;
        return new Status(color, icon, status.value, status.label);
      }

      default:
        break;
    }
  },
  priorityStyler(priority) {
    priority.color = {
      background: "#fff",
      hover: "#fff",
      text: "default"
    };
    return priority;
  }
};

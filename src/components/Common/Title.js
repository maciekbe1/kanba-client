import React, { useState, useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Done, Clear } from "@material-ui/icons";
import { cloneDeep } from "lodash";

export default function Title({ title, onTitleChange }) {
  const [value, setValue] = useState();
  const [editable, setEditable] = useState(false);

  const cardTitle = useRef();

  useEffect(() => {
    setValue(cardTitle.current.textContent);
  }, []);

  useOutsideEvent(cardTitle);

  const onMouseDown = (e) => {
    e.stopPropagation();
    cardTitle.current.contentEditable = true;
    cardTitle.current.focus();
    setEditable(true);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      cardTitle.current.blur();
    }
  };

  const onBlur = () => {
    setEditable(false);
    if (cardTitle.current.textContent.length === 0) {
      cardTitle.current.textContent = cloneDeep(value);
    }
    if (cardTitle.current.textContent !== value) {
      onTitleChange(cardTitle.current.textContent, "title");
      setValue(cardTitle.current.textContent);
    }
  };

  const onPaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    document.execCommand("insertText", false, text);
  };

  const onClikcAccept = () => {
    cardTitle.current.blur();
  };

  const onClikcDiscard = () => {
    cardTitle.current.textContent = cloneDeep(value);
    cardTitle.current.contentEditable = false;
    setEditable(false);
    cardTitle.current.blur();
  };

  return (
    <div className="title-component">
      <Typography
        ref={cardTitle}
        onMouseDown={onMouseDown}
        onKeyPress={onKeyPress}
        tabIndex="0"
        onBlur={onBlur}
        onPaste={onPaste}
        className="title"
      >
        {title}
      </Typography>
      {editable ? (
        <div className="icons-wrapper">
          <Button
            size="small"
            onMouseDown={onClikcAccept}
            variant="contained"
            style={{
              marginRight: "2px",
              padding: "2px",
              minWidth: "10px"
            }}
          >
            <Done className="icon" />
          </Button>
          <Button
            variant="contained"
            size="small"
            onMouseDown={onClikcDiscard}
            style={{
              marginLeft: "2px",
              padding: "2px",
              minWidth: "10px"
            }}
          >
            <Clear className="icon" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function useOutsideEvent(ref) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      ref.current.setEditable = false;
      ref.current.blur();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

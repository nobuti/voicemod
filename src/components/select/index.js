import React, { useEffect, useState, useRef, useCallback } from "react";
import classnames from "classnames";

import Option from "./option";

const KEYS = {
  down: "ArrowDown",
  up: "ArrowUp",
  enter: "Enter",
  esc: "Escape",
};

const Dropdown = ({ value, options, placeholder = "Select", onChange }) => {
  const node = useRef();

  let initialValue = null;
  if (value != null) {
    const [selected] = options.filter((opt) => opt.value === value);
    if (selected) {
      initialValue = selected;
    }
  }

  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(null);

  const isFocused = useCallback(() => {
    return document.activeElement === node.current;
  }, []);

  const handleClickOutside = (e) => {
    if (!node.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleChange = useCallback(
    (opt) => {
      onChange && onChange(opt.value);
      setOpen(false);
    },
    [onChange]
  );

  const downAction = useCallback(() => {
    if (options.length && isFocused()) {
      if (!open) {
        setOpen(true);
      }
      setCursor((prevState) =>
        prevState < options.length - 1
          ? prevState + 1
          : Math.min(prevState, options.length - 1)
      );
    }
  }, [isFocused, open, options.length]);

  const upAction = useCallback(() => {
    if (options.length && isFocused()) {
      if (!open) {
        setOpen(true);
      }
      setCursor((prevState) =>
        prevState > 0 ? prevState - 1 : Math.max(prevState, 0)
      );
    }
  }, [isFocused, open, options.length]);

  const enterAction = useCallback(() => {
    if (options.length && isFocused()) {
      handleChange(options[cursor]);
    }
  }, [cursor, handleChange, isFocused, options]);

  const escapeAction = useCallback(() => {
    if (isFocused()) {
      open ? setOpen(false) : node.current.blur();
    }
  }, [isFocused, open]);

  const openHandler = () => {
    setOpen(!open);
    node.current.focus();
  };

  const keydownHandler = useCallback(
    ({ key }) => {
      if (key === KEYS.down) {
        downAction();
      }

      if (key === KEYS.up) {
        upAction();
      }

      if (key === KEYS.enter) {
        enterAction();
      }

      if (key === KEYS.esc) {
        escapeAction();
      }
    },
    [downAction, enterAction, escapeAction, upAction]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  useEffect(() => {
    if (options.length && hovered) {
      setCursor(options.indexOf(hovered));
    }
  }, [hovered, options]);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      ref={node}
      className={classnames("Select", { "is-open": open })}
      tabIndex="0"
      data-testid="select"
    >
      <div className="Select-inner">
        <button
          data-testid="select-value"
          className="Select-value"
          onClick={openHandler}
        >
          {(initialValue && initialValue.label) || placeholder}
        </button>
        <i data-testid="select-icon" className="Select-icon"></i>
      </div>
      {open && (
        <ul className="Select-menu">
          {options.map((opt, index) => (
            <Option
              key={opt.value}
              active={
                index === cursor ||
                (initialValue && opt.value === initialValue.value)
              }
              opt={opt}
              selectHandler={handleChange}
              hoverHandler={setHovered}
            >
              {opt.label}
            </Option>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

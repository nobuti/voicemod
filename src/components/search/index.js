import React, { useState, useRef } from "react";
import classnames from "classnames";

const Search = ({ placeholder = "", onChange, name = "search" }) => {
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  const node = useRef();

  const changeHandler = (e) => {
    const { value } = e.target;
    setValue(value);
    onChange != null && onChange(value);
  };

  const focusHandle = () => {
    setFocus(true);
  };

  const blurHandle = () => {
    setFocus(false);
  };

  const resetHandler = () => {
    setValue("");
    onChange != null && onChange("");
  };

  return (
    <div
      data-testid="search"
      className={classnames("Search", { "is-focused": focus })}
      ref={node}
    >
      <i data-testid="search-icon" className="Search-icon"></i>
      <input
        data-testid="search-field"
        className="Search-field"
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
        onFocus={focusHandle}
        onBlur={blurHandle}
      />
      {value !== "" && (
        <button
          data-testid="search-reset"
          type="button"
          className="Search-reset"
          onClick={resetHandler}
        >
          Reset search
        </button>
      )}
    </div>
  );
};

export default Search;

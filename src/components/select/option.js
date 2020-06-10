import React from "react";
import classnames from "classnames";

const Item = ({ opt, active, selectHandler, hoverHandler, children }) => {
  return (
    <li
      className={classnames("Select-option", { "is-active": active })}
      onClick={() => selectHandler(opt)}
      onMouseEnter={() => hoverHandler(opt)}
      onMouseLeave={() => hoverHandler(null)}
      data-testid="option"
    >
      {children}
    </li>
  );
};

export default Item;

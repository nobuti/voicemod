import React, { useCallback } from "react";
import classnames from "classnames";

const Voice = ({
  id,
  name,
  icon,
  active = false,
  favorite = false,
  onChange,
}) => {
  const favHandler = useCallback(
    () => onChange != null && onChange({ id, favorite: !favorite }),
    [favorite, id, onChange]
  );

  return (
    <div
      data-testid="voice"
      className={classnames("Voice", {
        "is-active": active,
        "is-favorite": favorite,
      })}
      tabIndex={0}
      onClick={favHandler}
    >
      <div className="Voice-image">
        <img src={`${process.env.PUBLIC_URL}/${icon}`} alt={name} />;
      </div>
      <div className="Voice-name">{name}</div>
      <button className="Voice-favorite" data-testid="voice-fav">
        {favorite ? "Please don't" : "Fav me"}
      </button>
    </div>
  );
};

export default Voice;

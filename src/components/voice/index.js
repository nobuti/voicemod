import React, { useCallback } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { addFavorite, removeFavorite } from "../../store/actions/voicesActions";

export const Voice = ({
  id,
  name,
  icon,
  active = false,
  favorite = false,
  addFavorite,
  removeFavorite,
}) => {
  const favHandler = useCallback(
    () => (favorite ? removeFavorite(id) : addFavorite(id)),
    [addFavorite, favorite, id, removeFavorite]
  );

  return (
    <div
      data-testid="voice"
      className={classnames("Voice", {
        "is-active": active,
        "is-favorite": favorite,
      })}
      tabIndex={0}
    >
      <div className="Voice-image">
        <img src={`${process.env.PUBLIC_URL}/${icon}`} alt={name} />;
      </div>
      <div className="Voice-name">{name}</div>
      <button
        className="Voice-favorite"
        data-testid="voice-fav"
        onClick={favHandler}
      >
        {favorite ? "Please don't" : "Fav me"}
      </button>
    </div>
  );
};

export default connect(null, { addFavorite, removeFavorite })(Voice);

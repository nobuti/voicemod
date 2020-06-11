import React from "react";

import Voice from "../voice";
import Grid from "../grid";

const Favorites = ({ voices, favorites }) => {
  const items = favorites.reduce((memo, favorite) => {
    memo.push(voices[favorite]);
    return memo;
  }, []);

  return (
    <Grid title="Favourite voices">
      {items.length > 0 ? (
        items.map((voice) => (
          <li key={voice.id}>
            <Voice favorite={true} {...voice} />
          </li>
        ))
      ) : (
        <li className="Grid-fullStretch" data-testid="favourite-empty">
          You don't have any favourite voice yet. You can add a favourite voice
          clicking on the small and cute heart on every voice.
        </li>
      )}
    </Grid>
  );
};

export default Favorites;

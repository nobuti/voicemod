import React from "react";

import Voice from "../voice";
import Grid from "../grid";

const Voices = ({ voices, favorites }) => {
  return (
    <Grid title="Pro voices">
      {voices.length > 0 ? (
        voices.map((voice) => (
          <li key={voice.id}>
            <Voice favorite={favorites.includes(voice.id)} {...voice} />
          </li>
        ))
      ) : (
        <li className="Grid-fullStretch" data-testid="voices-empty">
          We have not found any results, try with another combination of
          filters.
        </li>
      )}
    </Grid>
  );
};

export default Voices;

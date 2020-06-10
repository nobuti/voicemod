import React from "react";

import Voice from "../voice";
import Grid from "../grid";

const Voices = ({ voices, favorites }) => {
  return (
    <Grid title="Pro voices">
      {voices.map((voice) => (
        <li key={voice.id}>
          <Voice favorite={favorites.includes(voice.id)} {...voice} />
        </li>
      ))}
    </Grid>
  );
};

export default Voices;

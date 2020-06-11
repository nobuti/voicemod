import React from "react";
import { useTransition, animated, config } from "react-spring";

import Voice from "../voice";
import Grid from "../grid";

const Favorites = ({ voices, favorites }) => {
  const items = favorites.reduce((memo, favorite) => {
    memo.push(voices[favorite]);
    return memo;
  }, []);

  const transitions = useTransition(items, (item) => item.id, {
    config: { ...config.wobbly, duration: 125 },
    enter: {
      opacity: 1,
      transform: "scale(1)",
    },
    leave: { opacity: 0, transform: "scale(1.4)" },
    from: { opacity: 0, transform: "scale(0.7)" },
  });

  return (
    <Grid title="Favourite voices">
      {items.length > 0 ? (
        transitions.map(({ item, props, key }) => (
          <animated.li key={key} style={props}>
            <Voice favorite={true} {...item} />
          </animated.li>
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

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { initVoices } from "./store/actions/voicesActions";
import config from "./config";
import Voices from "./components/voices";
import Favorites from "./components/favorites";
import Filter from "./components/filter";
import Loading from "./components/loading";
import { applyFilter, random } from "./utils/filter";

const storage = window.sessionStorage;

const fetchVoices = async () => {
  try {
    const data = await fetch(`${process.env.PUBLIC_URL}/voices.json`);
    const voices = await data.json();
    return voices;
  } catch (e) {
    console.error(e);
  }
};

function App({ fetching, collection, favorites, filter, initVoices }) {
  const [voices, setVoices] = useState([]);
  useEffect(() => {
    async function loadData() {
      let data = storage.getItem(config.storageKey);
      if (data) {
        initVoices(JSON.parse(data));
      } else {
        data = await fetchVoices();
        const payload = { voices: data, favorites: [] };
        storage.setItem(config.storageKey, JSON.stringify(payload));
        initVoices(payload);
      }
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectRandom = () => {
    const randomIndex = random(0, voices.length - 1);
    const voicesWithRandom = voices.map((voice, index) => {
      voice.active = index === randomIndex;
      return voice;
    });

    setVoices(voicesWithRandom);
  };

  useEffect(() => {
    const voices = fetching
      ? []
      : applyFilter({ voices: collection, options: filter });
    setVoices(voices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, filter]);

  return (
    <div className="Container">
      {fetching ? (
        <Loading />
      ) : (
        <>
          <Filter voices={collection} onRandom={selectRandom} />

          <div className="Container-inner">
            <Favorites favorites={favorites} voices={collection} />
            <Voices favorites={favorites} voices={voices} />
          </div>
        </>
      )}
    </div>
  );
}

const mapState = ({ voices, filter }) => ({ ...voices, filter });
export default connect(mapState, { initVoices })(App);

import React, { useEffect } from "react";
import { connect } from "react-redux";

import { initVoices } from "./store/actions/voicesActions";
import config from "./config";
import Voices from "./components/voices";
import Favorites from "./components/favorites";

import Search from "./components/search";
import Select from "./components/select";

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

function App({ fetching, collection, favorites, initVoices }) {
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

  return (
    <div className="Container">
      {fetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <header className="Filter">
            <div className="Filter-search">
              <Search />
            </div>

            <div className="Filter-selectors">
              <div className="Filter-withIcon Filter-select">
                <i className="Filter-icon Filter-iconTag" />
                <Select
                  options={[
                    { label: "All", value: "all" },
                    { label: "One", value: "one" },
                  ]}
                  value="all"
                />
              </div>

              <div className="Filter-withIcon Filter-select">
                <i className="Filter-icon Filter-iconSort" />
                <Select
                  options={[
                    { label: "Recently added", value: "created" },
                    { label: "Descending", value: "desc" },
                    { label: "Ascending", value: "asc" },
                  ]}
                />
              </div>

              <button className="Filter-button Filter-withIcon">
                <i className="Filter-icon Filter-iconRandom" />
                <span>Select a random voice</span>
              </button>
            </div>
          </header>

          <div className="Container-inner">
            <Favorites favorites={favorites} voices={collection} />
            <Voices favorites={favorites} voices={collection} />
          </div>
        </>
      )}
    </div>
  );
}

const mapState = ({ voices }) => ({ ...voices });
export default connect(mapState, { initVoices })(App);

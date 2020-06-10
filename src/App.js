import React, { useEffect } from "react";
import { connect } from "react-redux";

import { initVoices } from "./store/actions/voicesActions";

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

function App({ collection, favorites, initVoices }) {
  useEffect(() => {
    async function loadData() {
      let data = storage.getItem("voicemod-challenge");
      if (data) {
        initVoices(JSON.parse(data));
      } else {
        data = await fetchVoices();
        const payload = { voices: data, favorites: [] };
        storage.setItem("voicemod-challenge", JSON.stringify(payload));
        initVoices(payload);
      }
    }

    loadData();
  }, [initVoices]);

  console.log(collection, favorites);

  return (
    <div className="Container">
      <header>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div className="Container-inner">
        <h1 className="Heading">Favourite voices</h1>
      </div>
    </div>
  );
}

const mapState = ({ voices }) => ({ ...voices });
export default connect(mapState, { initVoices })(App);

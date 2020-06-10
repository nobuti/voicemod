import React from "react";

import Voice from "./components/voice";

function App() {
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

        <Voice id={1} name="Wadus" icon="VoicesVoiceIcon01.png" />
        <Voice
          id={2}
          favorite={true}
          name="Wadus"
          icon="VoicesVoiceIcon03.png"
        />
        <Voice
          id={2}
          favorite={true}
          name="Wadus"
          icon="VoicesVoiceIcon02.png"
          active={true}
        />

        <Voice
          id={2}
          favorite={false}
          name="Wadus"
          icon="VoicesVoiceIcon01.png"
          active={true}
        />
      </div>
    </div>
  );
}

export default App;

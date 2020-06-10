import React, { useState } from "react";
import Dropdown from "./components/select";
import Search from "./components/search";

function App() {
  const [fruit, setFruit] = useState("banana");
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <header className="App-header">
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

      <Search onChange={setSearch} />

      <Dropdown
        placeholder="Select Fruit"
        value={fruit}
        onChange={setFruit}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "BananaBananaBananaBananaBanana" },
          { value: "orange", label: "Orange" },
          { value: "mango", label: "Mango" },
        ]}
      />
    </div>
  );
}

export default App;

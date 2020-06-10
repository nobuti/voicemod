import React, { useState } from "react";
import Dropdown from "./components/select";

function App() {
  const [fruit, setFruit] = useState("banana");
  const [sort, setSort] = useState(null);

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

      <Dropdown
        placeholder="Select sort"
        value={sort}
        onChange={setSort}
        options={[
          { value: "desc", label: "DESC" },
          { value: "asc", label: "ASC" },
        ]}
      />
    </div>
  );
}

export default App;

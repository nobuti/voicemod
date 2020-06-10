import React from "react";

const Grid = ({ title, children }) => {
  return (
    <section data-testid="grid" className="Section">
      <h1 data-testid="grid-title" className="Heading">
        {title}
      </h1>
      <ul data-testid="grid-list" className="Grid">
        {children}
      </ul>
    </section>
  );
};

export default Grid;

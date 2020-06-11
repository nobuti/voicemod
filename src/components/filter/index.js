import React from "react";
import { connect } from "react-redux";

import Search from "../search";
import Select from "../select";
import getCategories from "../../utils/categories";
import config from "../../config";
import { updateFilter } from "../../store/actions/filterActions";
import debounce from "../../utils/debounce";

export const Filter = ({ voices, filter, updateFilter, onRandom }) => {
  const categories = getCategories(voices);

  const onChangeCategorie = (value) => {
    updateFilter({ filter: "categorie", value });
  };

  const onChangeSort = (value) => {
    updateFilter({ filter: "sort", value });
  };

  const onChangeSearch = debounce((value) => {
    updateFilter({ filter: "search", value });
  }, 250);

  const onClickRandom = () => {
    onRandom != null && onRandom();
  };

  return (
    <header className="Filter" data-testid="filter">
      <div className="Filter-search">
        <Search onChange={onChangeSearch} />
      </div>

      <div className="Filter-selectors">
        <div className="Filter-withIcon Filter-select">
          <i className="Filter-icon Filter-iconTag" />
          <Select
            options={categories}
            value={filter.categorie}
            onChange={onChangeCategorie}
          />
        </div>

        <div className="Filter-withIcon Filter-select">
          <i className="Filter-icon Filter-iconSort" />
          <Select
            options={config.sortOptions}
            value={filter.sort}
            onChange={onChangeSort}
          />
        </div>

        <button
          className="Filter-button Filter-withIcon"
          onClick={onClickRandom}
          data-testid="filter-random"
        >
          <i className="Filter-icon Filter-iconRandom" />
          <span>Select a random voice</span>
        </button>
      </div>
    </header>
  );
};

const mapState = ({ filter }) => ({ filter });
export default connect(mapState, { updateFilter })(Filter);

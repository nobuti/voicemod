const sort = ({ voices, direction }) => {
  if (!["desc", "asc"].includes(direction)) {
    return voices;
  }

  return direction === "asc"
    ? voices.sort((a, b) => a.name.localeCompare(b.name))
    : voices.sort((a, b) => b.name.localeCompare(a.name));
};

const filter = ({ voices, categorie }) => {
  return voices.filter((voice) => voice.tags.includes(categorie));
};

const search = ({ voices, query }) =>
  voices.filter((voice) => voice.name.includes(query));

const applyFilter = ({ voices, options }) => {
  let result = [...voices];

  if (options.search !== "") {
    result = search({ voices: result, query: options.search });
  }

  if (options.categorie !== "all") {
    result = filter({ voices: result, categorie: options.categorie });
  }

  if (options.sort) {
    result = sort({ voices: result, direction: options.sort });
  }

  return result;
};

export { sort, filter, search, applyFilter };

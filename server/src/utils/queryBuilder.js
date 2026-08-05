const buildFilter = (query, allowedFilters) => {
  const filter = {};
  allowedFilters.forEach((key) => {
    const value = query[key];
    if (value !== undefined && value !== null && value !== "") {
      filter[key] = value;
    }
  });
  return filter;
};

module.exports = buildFilter;

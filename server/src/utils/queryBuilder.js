const buildFilter = (
    query,
    allowedFilters
) => {
    const filter = {};
    allowedFilters.forEach((key) => {
        if (query[key] !== undefined && query[key] !== null) {
            filter[key] = query[key];
        }
    });
    return filter;
};

module.exports = buildFilter;
const paginate = async(
    model,
    filter = {},
    page = 1,
    limit = 10,
    options = {}
) => {
    const skip = (page - 1) * limit;
    const totalRecords = await model.countDocuments(filter);
    const data = await model
    .find(filter)
    .sort(options.sort || { createdAt: -1 })
    .skip(skip)
    .limit(limit)
    return {
        data,
        pagination: {
            page,
            limit,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit)
        }
    }
}

module.exports = paginate;
export const getSearchParams = (params) => {
    const removeFalseValues = ([key, value]) => value !== null && value !== "";
    const reduceValues = (searchParams, [key, value]) => {
        searchParams[key] = value;
        return searchParams;
    };

    return Object
        .entries(params)
        .filter(removeFalseValues)
        .reduce(reduceValues, {});
};

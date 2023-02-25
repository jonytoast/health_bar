
const { FDC_API_KEY } = process.env;

const API_SERVER = 'https://api.nal.usda.gov/fdc';
const SEARCH_ENDPOINT = '/v1/foods/search';
const FETCH_MANY_ENDPOINT = '/v1/foods/';
const FETCH_ENDPOINT = '/v1/food/';

module.exports.queryFoods = function queryFoods(query) {
    return fetch(`${API_SERVER}${SEARCH_ENDPOINT}?api_key=${FDC_API_KEY}&query=${encodeURIComponent(query)}&dataType=Foundation`)
        .then(res => res.json());
}

module.exports.fetchFood = function fetchFood(fdcId) {
    return fetch(`${API_SERVER}${FETCH_ENDPOINT}${fdcId}?api_key=${FDC_API_KEY}`)
        .then(res => res.json());
}

module.exports.fetchFoods = function fetchFoods(fdcIds) {
    return fetch(`${API_SERVER}${FETCH_MANY_ENDPOINT}?api_key=${FDC_API_KEY}&${fdcIds.map(fdcId => `fdcIds[]=${fdcId}`)}`)
        .then(res => res.json());
}

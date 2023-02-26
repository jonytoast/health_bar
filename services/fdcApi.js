const fetch = require('node-fetch');
require('dotenv').config();
const API_KEY = process.env.FDC_API_KEY || "6f5DFxCD1kdObb3IAxnx2DqhZsvVfBXgQXmVBAsD";
const API_SERVER = 'https://api.nal.usda.gov/fdc';
const SEARCH_ENDPOINT = '/v1/foods/search';
const FETCH_MANY_ENDPOINT = '/v1/foods/';
const FETCH_ENDPOINT = '/v1/food/';



function queryFoods(query) {
    return fetch(`${API_SERVER}${SEARCH_ENDPOINT}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => console.log(data.foods[0].foodNutrients));
};

function fetchFood(fdcId) {
    return fetch(`${API_SERVER}${FETCH_ENDPOINT}${fdcId}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => console.log(data));
};

function fetchFoods(fdcIds) {
    return fetch(`${API_SERVER}${FETCH_MANY_ENDPOINT}?api_key=${API_KEY}&${fdcIds.map(fdcId => `fdcIds[]=${fdcId}`)}`)
        .then(res => res.json())
        .then(data => console.log(data));
};



module.exports = { queryFoods, fetchFoods, fetchFood };
const fetch = require('node-fetch');

const API_KEY = process.env.FDC_API_KEY || "uPUi5hMKwzSOBHqauPYyykPsQUrhoBmt2vy8lNlm";
const API_SERVER = 'https://api.nal.usda.gov/fdc';
const SEARCH_ENDPOINT = '/v1/foods/search';
const FETCH_MANY_ENDPOINT = '/v1/foods/';
const FETCH_ENDPOINT = '/v1/food/';

async function queryFoods(query) {
    try {
        const res = await fetch(`${API_SERVER}${SEARCH_ENDPOINT}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await res.json();
        const { foods } = data;

        // declares variables to store returned API data
        const mappedFoodData = foods.map(food => ({
            id: food.fdcId,
            description: food.description,
            serving: {
                size: food.servingSize,
                unit: food.servingSizeUnit
            },
            nutrients: food.foodNutrients.map(nutrient => ({
                id: nutrient.nutrientId,
                name: nutrient.nutrientName,
                amount: nutrient.value,
                unit: nutrient.unitName
            })),
            // raw: food
        }));

        // Filter out branded results and non-exact matches
        const filteredFoodData = mappedFoodData.filter(food => {
            return (
                food.dataType !== 'Branded' &&
                food.description.toUpperCase() === query.toUpperCase()
            );
        });

        return filteredFoodData;
    } catch(err) {
        // catches and displays errors
        console.log(err);
        throw err;
    };
};

function fetchFoods(fdcIds) {
    return fetch(`${API_SERVER}${FETCH_MANY_ENDPOINT}?api_key=${API_KEY}&${fdcIds.map(fdcId => `fdcIds[]=${fdcId}`)}`)
        .then(res => res.json())
        .then(data => console.log(data));
};

module.exports = { queryFoods, fetchFoods };

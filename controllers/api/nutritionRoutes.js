// imports required packages 
const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config();
const API_KEY = process.env.FDC_API_KEY || "uPUi5hMKwzSOBHqauPYyykPsQUrhoBmt2vy8lNlm";
const API_SERVER = 'https://api.nal.usda.gov/fdc';
const SEARCH_ENDPOINT = '/v1/foods/search';
const FETCH_ENDPOINT = '/v1/food/';

// node-fetch GET request to retriece queried food's nutritional data
router.get('/:name',async (req,res) =>{

    try {

        const query = req.params.name;

        // node-fetch to retrieve the fdcid of queried food
        fetch(`${API_SERVER}${SEARCH_ENDPOINT}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data=> {

            // stores list of matching foods in an array
            const dataArray = [data];
            const foodArray = dataArray[0].foods;

            // if API returns no match
            if (foodArray.length === 0) {

                console.log("Result Not Found. Please Try Again!");
                
            } else {

                // declares variables to store returned API data
                let foodId;
                let servingSize;
                let servingUnit;
                let nutrientsArray;

                // loops through returned API data for matching food
                for (food of foodArray) {
                    // if serving size and unit of measure is not listed
                    if (!food.servingSize || !food.servingSizeUnit) {
                        console.log("Serving Size Not Defined. Please Try Again");
                        return;
                    };

                    // selects the first exact match and retrieces fdcId
                    if (food.description.toUpperCase() === query.toUpperCase() && food.servingSize && food.servingSizeUnit) {
                        foodId = food.fdcId;
                        servingSize = food.servingSize;
                        servingUnit = food.servingSizeUnit;
                        break;
                    }
                }

                // GET request to retrieve food nutrients by fdcId
                fetch(`${API_SERVER}${FETCH_ENDPOINT}${foodId}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    nutrientsArray = data.foodNutrients;
                    // TODO: make use of data instead of console.log()
                    const result = {
                        ingredientName: query,
                        servingSize: servingSize,
                        unitOfMeasure: servingUnit,
                        nutrients:nutrientsArray
                    };
                    
                    res.status(200).render('nutrition',{ result });

                    
                });


            }   
        });




    } catch(err) {
        res.status(404).json(err);




    }

});







module.exports = router;
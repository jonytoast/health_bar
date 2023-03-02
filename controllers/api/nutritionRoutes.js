// imports required packages 
const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config();
const API_KEY = process.env.FDC_API_KEY;
const API_SERVER = 'https://api.nal.usda.gov/fdc';
const SEARCH_ENDPOINT = '/v1/foods/search';
const isVegan = require('is-vegan');
const { Recipe } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// node-fetch GET request to retriece queried food's nutritional data
router.get('/:name',async (req,res) =>{

    try {

        const query = req.params.name;

        const recipes = await Recipe.findAll({
            where: {
                recipe_text: {
                    [Op.like]: '%' + query + '%'
                }
            }
        }); 

        const recipeData = recipes.map((recipe)=>
        recipe.get({plain:true}));


        // node-fetch to retrieve the fdcid of queried food
        fetch(`${API_SERVER}${SEARCH_ENDPOINT}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&pageSize=20`)
        .then(res => res.json())
        .then(data=> {


            if (data.foods.length ===0) {

                const noResult = true;
                res.status(404).render('nutrition',{ noResult, query, recipeData });
                return;

            } else if (!data.foods[0].servingSize || !data.foods[0].servingSizeUnit) {
                
                const noResult = true;
                res.status(404).render('nutrition',{ noResult, query, recipeData });
                return;

            } else {

                if (req.params.name.split(" ").length > 1) {

                    

                    const servingSize = Math.round(data.foods[0].servingSize);
                    const unit = data.foods[0].servingSizeUnit;
        
                    if (servingSize.length === 0 || unit.length ===0 ) {
                        console.log("Data Not Found. Please Try Again!");
                        return;
                    };
        
                    const nutrients = data.foods[0].foodNutrients;
                    const filteredNutrients = nutrients.filter((nutrient)=>{
                        if (nutrient.value !== 0) {
                            return true;
                        } else {
                            return false
                        }
                    });
    
                    const result = {
                        foodName: req.params.name.toUpperCase(),
                        servingSize: servingSize,
                        unit: unit,
                        nutrients: filteredNutrients,
                    };
    
           
                    res.status(200).render('nutrition',{ result, query, recipeData });
                    
                    
                } else {

                    const vegan = isVegan.isVeganIngredient(req.params.name.toLowerCase());

                    let veganWarning;

                    if (vegan) {
                        veganWarning = "This ingredient is vegan!"
                    } else {
                        veganWarning = "This ingredient is NOT vegan!"
                    };

                    const servingSize = Math.round(data.foods[0].servingSize);
                    const unit = data.foods[0].servingSizeUnit;
        
                    if (servingSize.length === 0 || unit.length ===0 ) {
                        console.log("Data Not Found. Please Try Again!");
                        return;
                    };
        
                    const nutrients = data.foods[0].foodNutrients;
                    const filteredNutrients = nutrients.filter((nutrient)=>{
                        if (nutrient.value !== 0) {
                            return true;
                        } else {
                            return false
                        }
                    });
    
                    const result = {
                        foodName: req.params.name.toUpperCase(),
                        servingSize: servingSize,
                        unit: unit,
                        nutrients: filteredNutrients,
                        isVegan: veganWarning
                    };
    
                    res.status(200).render('nutrition',{ result, query, recipeData });
                
                };



      
            }


        });


    } catch(err) {
        res.status(500).json({ err: err.message });
    }

});







module.exports = router;
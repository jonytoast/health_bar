const router = require('express').Router();
const FDCApi = require('../../services/fdcApi');

router.get('/:name',async (req,res) =>{
    try {

        const ingredient = req.params.name;

        const result = await FDCApi.queryFoods(ingredient)

        // TODO: figure out why result is undefined




    } catch(err) {
        res.status(404).json(err);




    }

})

FDCApi.queryFoods();





module.exports = router;
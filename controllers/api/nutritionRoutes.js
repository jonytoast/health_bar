const router = require('express').Router();
const FDCApi = require('../../services/fdcApi');

router.get('/search/:ingredient', async (req,res) =>{
    try {
        const { ingredient } = req.params;
        const result = await FDCApi.queryFoods(ingredient);
        console.log(result);
        if (!result.length) {
            res.status(404).json([]);
        } else {
            res.json(result);
        }
    } catch(err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;
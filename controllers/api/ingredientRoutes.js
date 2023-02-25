const router = require('express').Router();
const FDCApi = require('../../services/fdcApi');

// Search for a list of ingredients
router.get('/search', async (req, res) => {
  try {
    const foods = await FDCApi.queryFoods(req.query.search);

    res.json(foods);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

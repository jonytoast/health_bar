const router = require('express').Router();
const FDCApi = require('../../services/fdcApi');



FDCApi.queryFoods("sliced ham");





module.exports = router;
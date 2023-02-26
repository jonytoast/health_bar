const router = require('express').Router();
const FDCApi = require('../../services/fdcApi');

FDCApi.queryFoods("egg");

FDCApi.fetchFood(748236);



module.exports = router;
const express = require('express');
const controller =require('../controllers/conveniences');
const router = express.Router();

// POST: localhost:5000/api/conveniences/create-commodity
router.post('/create-commodity',
    controller.createCommodity);

// POST: localhost:5000/api/conveniences/update-commodity
router.post('/update-commodity',
    controller.updateCommodity);

// POST: localhost:5000/api/conveniences/delete-commodity
router.post('/delete-commodity',
    controller.deleteCommodity);

// GET: localhost:5000/api/conveniences/commodities
router.get('/commodities',
    controller.getCommodities);


module.exports = router;

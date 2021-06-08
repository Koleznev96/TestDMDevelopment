const express = require('express');
const controller =require('../controllers/facilities');
const router = express.Router();

// POST: localhost:5000/api/facilities/commodity
router.post('/commodity',
    controller.createCommodity);

// PUT: localhost:5000/api/facilities/commodity/:id
router.put('/commodity/:id',
    controller.updateCommodity);

// DELETE: localhost:5000/api/facilities/commodity/:id
router.delete('/commodity/:id',
    controller.deleteCommodity);

// GET: localhost:5000/api/facilities/commodities
router.get('/commodities',
    controller.getCommodities);


module.exports = router;

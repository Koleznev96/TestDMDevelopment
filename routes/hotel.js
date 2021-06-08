const express = require('express');
const controller =require('../controllers/room');
const router = express.Router();

// POST: localhost:5000/api/hotel/room
router.post('/room',
    controller.createRoom);

// PUT: localhost:5000/api/hotel/room/:id
router.put('/room/:id',
    controller.updateRoom);

// DELETE: localhost:5000/api/hotel/room/:id
router.delete('/room/:id',
    controller.deleteRoom);

// GET: localhost:5000/api/hotel/room/:id
router.get('/room/:id',
    controller.getRoom);


module.exports = router;

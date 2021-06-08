const express = require('express');
const controller =require('../controllers/room');
const router = express.Router();

// POST: localhost:5000/api/hotel/create-room
router.post('/create-room',
    controller.createRoom);

// POST: localhost:5000/api/hotel/update-room
router.post('/update-room',
    controller.updateRoom);

// POST: localhost:5000/api/hotel/delete-room
router.post('/delete-room',
    controller.deleteRoom);

// GET: localhost:5000/api/hotel/rooms
router.get('/rooms',
    controller.getRooms);

// GET: localhost:5000/api/hotel/rooms/:roomId
router.get('/room/:roomId',
    controller.getRoom);


module.exports = router;

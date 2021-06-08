const errorHandler = require('../utils/errorHandler');

const Room = require('../models/Room');
const Facilities = require('../models/Facilities');
const RoomFacilities = require('../models/RoomFacilities');


module.exports.createRoom = async function(req, res) {
    try {
        res.status(201).json();
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.updateRoom = async function(req, res) {
    try {
        res.status(201).json();
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.deleteRoom = async function(req, res) {
    try {
        res.status(201).json();
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.getRoom = async function(req, res) {
    try {
        res.status(201).json();
    } catch(e) {
        errorHandler(res, e)
    }
}

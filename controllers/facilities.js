const errorHandler = require('../utils/errorHandler');

const Facilities = require('../models/Facilities');


module.exports.createCommodity = async function(req, res) {
    try {
        res.status(201).json();
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.updateCommodity = async function(req, res) {
    try {
        res.status(201).json();
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.deleteCommodity = async function(req, res) {
    try {
        res.status(201).json();
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.getCommodities = async function(req, res) {
    try {
        res.status(201).json();
    } catch(e) {
        errorHandler(res, e)
    }
}

const errorHandler = require('../utils/errorHandler');

const Conveniences = require('../models/Conveniences');


module.exports.createCommodity = async function(req, res) {
    try {
        const { convenience } = req.body;

        if (!convenience.commodity || convenience.commodity === "") {
            return errorHandler(res, {massage: "Поле commodity пустое."}, 401);
        }

        const existing = await Conveniences.findOne({
            commodity: convenience.commodity
        });

        if (existing) {
            const conveniences = await Conveniences.find();
            return res.json({ conveniences });
        }

        const convenienceNew = new Conveniences({
            commodity: convenience.commodity
        });

        await convenienceNew.save();

        const conveniences = await Conveniences.find();

        res.status(201).json({ conveniences: conveniences });
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.updateCommodity = async function(req, res) {
    try {
        const { convenience } = req.body;

        if (!convenience.commodity || convenience.commodity === "") {
            return errorHandler(res, {massage: "Поле commodity пустое."}, 401);
        }

        if (!convenience._id || convenience._id === "") {
            return errorHandler(res, {massage: "Поле _id пустое."}, 401);
        }

        let convenienceUpdate = await Conveniences.findOne({
            _id: convenience._id
        });

        if (!convenienceUpdate) {
            return errorHandler(res, {massage: `Удобство с id: ${convenience._id}, не найдено.`}, 401);
        }

        convenienceUpdate.commodity = convenience.commodity;
        await convenienceUpdate.save();

        res.status(201).json({
            conveniences: convenienceUpdate
        });
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.deleteCommodity = async function(req, res) {
    try {
        const { convenience } = req.body;

        if (!convenience._id || convenience._id === "") {
            return errorHandler(res, {massage: "Поле _id пустое."}, 401);
        }

        const convenienceDelete = await Conveniences.findOne({
            _id: convenience._id
        });

        if (!convenienceDelete) {
            return errorHandler(res, {massage: `Удобство с id: ${convenience._id}, не найдено.`}, 401);
        }

        await convenienceDelete.delete();

        const conveniences = await Conveniences.find();

        res.status(201).json({
            conveniences: conveniences
        });
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.getCommodities = async function(req, res) {
    try {
        const conveniences = await Conveniences.find();

        res.status(201).json({ conveniences });
    } catch(e) {
        errorHandler(res, e);
    }
}

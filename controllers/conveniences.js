const errorHandler = require('../utils/errorHandler');

const Conveniences = require('../models/Conveniences');


module.exports.createCommodity = async function(req, res) {
    try {
        const { conveniences } = req.body;

        if (!conveniences.commodity || conveniences.commodity === "") {
            return res.status(401).json({
                success: false,
                massage: "Поле commodity пустое."
            });
        }

        const existing = await Conveniences.findOne({
            commodity: conveniences.commodity
        });

        if (existing) {
            return res.json({ conveniences: existing });
        }

        const conveniencesNew = new Conveniences({
            commodity: conveniences.commodity
        });

        await conveniencesNew.save();

        res.status(201).json({ conveniences: conveniencesNew });
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.updateCommodity = async function(req, res) {
    try {
        const { conveniences } = req.body;

        if (!conveniences.commodity || conveniences.commodity === "") {
            return res.status(401).json({
                success: false,
                massage: "Поле commodity пустое."
            });
        }

        if (!conveniences.facilitiesId || conveniences.facilitiesId === "") {
            return res.status(401).json({
                success: false,
                massage: "Значение facilitiesId пустое."
            });
        }

        let conveniencesUpdate = await Conveniences.findOne({
            _id: conveniences.facilitiesId
        });

        if (!conveniencesUpdate) {
            return res.status(500).json({
                success: false,
                massage: `Удобство с id: ${conveniences.facilitiesId}, не найдено.`
            });
        }

        conveniencesUpdate.commodity = conveniences.commodity;
        await conveniencesUpdate.save();

        res.status(201).json({
            conveniences: conveniencesUpdate
        });
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.deleteCommodity = async function(req, res) {
    try {
        const { conveniences } = req.body;

        if (!conveniences.facilitiesId || conveniences.facilitiesId === "") {
            return res.status(401).json({
                success: false,
                massage: "Значение facilitiesId пустое."
            });
        }

        const conveniencesDelete = await Conveniences.findOne({
            _id: conveniences.facilitiesId
        });

        if (!conveniencesDelete) {
            return res.status(404).json({
                success: false,
                massage: `Удобство с id: ${conveniences.facilitiesId}, не найдено.`
            });
        }

        await conveniencesDelete.delete();

        res.status(201).json({
            conveniences: conveniencesDelete
        });;
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

const {Schema, model} = require('mongoose');

const facilitiesSchema = new Schema({
    commodity: {
        type: String,
        required: true,
    },
    imgSrc: {
        type: String,
        required: false
    }
});

module.exports = model('Facilities', facilitiesSchema);

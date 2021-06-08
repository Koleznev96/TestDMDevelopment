const {Schema, model} = require('mongoose');

const hotelSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    cost_per_day: {
        type: Number,
        required: true,
    },
    number_berths: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    }
});

module.exports = model('Hotel', hotelSchema);

const {Schema, model} = require('mongoose');

const roomSchema = new Schema({
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
    },
    imgSrc: {
        type: String,
        required: false
    }
});

module.exports = model('Room', roomSchema);

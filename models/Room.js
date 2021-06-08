const {Schema, model} = require('mongoose');

const roomSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    costPerDay: {
        type: Number,
        required: true,
    },
    numberBerths: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    numberRooms: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    }
});

module.exports = model('Room', roomSchema);

const {Schema, model} = require('mongoose');

const roomSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    costPerDay: {
        type: Number,
        required: false,
    },
    numberBerths: {
        type: Number,
        required: false
    },
    area: {
        type: Number,
        required: false
    },
    numberRooms: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
});

module.exports = model('Room', roomSchema);

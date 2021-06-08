const {Schema, model} = require('mongoose');

const facilitiesSchema = new Schema({
    id_hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    commodity: {
        type: String,
        required: true,
    },
});

module.exports = model('Facilities', facilitiesSchema);

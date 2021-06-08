const {Schema, model} = require('mongoose');

// Many-to-many relationship
const roomFacilitiesSchema = new Schema({
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    convenienceId: {
        type: Schema.Types.ObjectId,
        ref: 'Conveniences',
        required: true
    },
});

module.exports = model('RoomFacilities', roomFacilitiesSchema);

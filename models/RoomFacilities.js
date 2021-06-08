const {Schema, model} = require('mongoose');

// Many-to-many relationship
const roomFacilitiesSchema = new Schema({
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    FacilitiesId: {
        type: Schema.Types.ObjectId,
        ref: 'Facilities',
        required: true
    },
});

module.exports = model('RoomFacilities', roomFacilitiesSchema);

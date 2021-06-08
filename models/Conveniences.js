const {Schema, model} = require('mongoose');

const conveniencesSchema = new Schema({
    commodity: {
        type: String,
        required: true,
    }
});

module.exports = model('Conveniences', conveniencesSchema);

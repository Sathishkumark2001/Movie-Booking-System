const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = new Schema({
    date1: {
        type: String,
        required: true
    },
    date2:{
        type: String,
        required: true
    },
    Movie:{
        type: String,
        required: true
    },
    appt:{
        type: String,
        required: true
    },
    appt1:{
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        require: false
    }, user_id: {
        type: String,
        require: true
    },
    user_name: {
        type: String,
        require: true
    },
    screen_id: {
        type: String,
        require: true
    }

}, { timestamps: true });
const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;
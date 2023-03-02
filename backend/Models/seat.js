const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const theaterSchema = new Schema({
    Rows: {
        type: Array,
        required: true
    },
    Number_of_tickets: {
        type: Array,
        require: false
    }, Each_ticket: {
        type: Array,
        require: true
    },
    active: {
        type: Boolean,
        require: false
    },
    Time_slot: {
        type: Array,
        require: true
    },
    screen_id: {
        type:String,
        require:true

    }
    , user_id: {
        type: String,
        require: true
    },
    user_name: {
        type: String,
        require: true
    }


}, { timestamps: true });
const Seat = mongoose.model('Seat', theaterSchema);
module.exports = Seat;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const theaterSchema = new Schema({
    screen_name: {
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
    theater_id: {
        type: String,
        require: true
    },
    total_seats:{
        type: Number,
        require: true
    }


}, { timestamps: true });
const Screen = mongoose.model('Screen', theaterSchema);
module.exports = Screen;
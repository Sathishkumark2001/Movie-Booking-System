const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const theaterSchema = new Schema({
    theater_name: {
        type: String,
        required: true
    },
    theater_location: {
        type: String,
        required: true
    },
    theater_screen: {
        type: Number,
        required: true
    }, active: {
        type: Boolean,
        require: false
    }, user_id: {
        type: String,
        require: true
    },
    user_name: {
        type: String,
        require: true
    },Movie: {
        type: Array,
        require: true
    },
    time: {
        type: Array,
        require: true
    }



}, { timestamps: true });
const Theater = mongoose.model('Theater', theaterSchema);
module.exports = Theater;
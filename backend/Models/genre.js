const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    genre: {
        type: String,
        required: true
    }, user_id: {
        type: String,
        require: true
    },
    user_name: {
        type: String,
        require: true
    }

}, { timestamps: true });
const Genre = mongoose.model('Gener', genreSchema);
module.exports = Genre;
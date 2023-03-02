const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    language: {
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
const Language = mongoose.model('Language', languageSchema);
module.exports = Language;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const castSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    Image: {
        type: String,
        require: true
    }, 
     active: {
        type: Boolean,
        require: false
    },
    user_id: {
        type: String,
        require: true
    },
    user_name: {
        type: String,
        require: true
    }

}, { timestamps: true });

const Cast = mongoose.model('Cast', castSchema);
module.exports = Cast;
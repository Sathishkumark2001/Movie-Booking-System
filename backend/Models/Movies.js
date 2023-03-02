const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({
    Movie_name: {
        type: String,
        require: true
    },
    genre: {
        type: Array,
        require: true
    },
    Language: {
        type: Array,
        require: true
    },
    active: {
        type: Boolean,
        require: false
    },
    myImage: {
        type: String,
        require: true
    },
    backImage: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
        require: true
    },
    user_name: {
        type: String,
        require: true
    },
    release_date: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    certification: {
        type: String,
        require: true
    },
    Cast: {
        type: Array,
        require: true
    },
    Crew: {
        type: Array,
        require: true
    },
    From:{
        type: String,
        require: true
    },
    To:{
        type: String,
        require: true
    }


}, { timestamps: true });

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
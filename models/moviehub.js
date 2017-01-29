var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var movieSchema = new Schema(
    {
        title: {
            type: String, required: true, unique: true
        },
        year: {
            type: String, required: true
        },
        rating: {
            type: String, required: true
        },
        length: {
            type: String, required: true
        },
        genre: {
            type: String, required: true
        },
        director: {
            type: String, required: true
        },
        stars: {
            type: String, required: true
        },
        likes: {
            type: Number, default: 0
        },
        dislikes: {
            type: Number, default: 0
        }
    },
    {
        collection: 'movies'
    }
);

var connection = mongoose.createConnection('mongodb://localhost/moviesdb');

module.exports = connection.model('Movie', movieSchema);
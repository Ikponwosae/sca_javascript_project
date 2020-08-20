const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    author_name: {
        type: String,
        required: true
    },
    author_email: {
        type: String,
        required: true
    },
    recipe_name: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    steps: {
        type: String,
        required: false
    },
    p_time: {
        type: String,
        required:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Recipe', recipeSchema);
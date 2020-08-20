const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const recipeRouter = require('./routes/recipes');
const methodOverride = require('method-override'); // allows the form to use delete and put
require('dotenv').config();
const app = express();


//configuration for production database
 mongoose.connect(process.env.MONGODB_URI || process.env.DB_MAINLINK, { useNewUrlParser: true, useUnifiedTopology: true});

//local database
//  mongoose.connect('mongodb://localhost/', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});


//STATIC FOLDERS REFERENCE
app.use(express.static(__dirname + '/public')); //so it can see the css files

app.set('view engine','ejs');

//MIDDLEWARES
app.use(express.urlencoded({extended: false})); //telling express to use form inputs

app.use(methodOverride('_method'));

//ROUTES
app.use('/recipes', recipeRouter);

app.get('/', async (req, res) => {
   const recipes = await Recipe.find().sort({
       createdAt: 'desc'
   });
    res.render('recipes/index', { recipes: recipes});
});

// app.get('/', (req, res) => {
//     res.render('index', {recipes: recipes}); //object to feature recipes on index page
// });



const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
     console.log(`Server started on ${PORT}`);
});

 module.exports = app;




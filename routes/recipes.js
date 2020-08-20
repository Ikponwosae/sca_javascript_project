const express = require('express');

//recipe schema for mongoose from models/recipe
const Recipe = require('./../models/recipe');
const router = express.Router();

//route to create a new recipe i.e the form page
router.get('/create', (req, res) => {
    res.render('recipes/create', { recipe: new Recipe});
});

//route to info page
router.get('/info', (req, res) => {
    res.render('recipes/info');
});

//ROUTE TO EDIT A RECIPE
router.get('/edit/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/edit', { recipe: recipe});
});

 //redirect for individual recipe pages
 router.get('/:id', async (req, res) => {
     const recipe = await Recipe.findById(req.params.id);
     if(recipe == null) {
         res.redirect('/');
     }
    res.render('recipes/show', { recipe: recipe});
 });



//new post route
router.post('/', async (req, res, next) => {
    req.recipe = new Recipe();
    next();
}, saveAndRedirectRecipe('create'));



//TO EDIT A POST
router.put('/:id', async (req, res, next) => {
  req.recipe = await Recipe.findById(req.params.id);
    next();
}, saveAndRedirectRecipe('edit'));

//TO DELETE A POST
router.delete('/:id', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
     res.redirect('/');
});



//function for editing a recipe
function saveAndRedirectRecipe(path) {  //path to edit an article or path to save the article
    return async (req, res) => {
        let recipe = req.recipe;
            recipe.author_name = req.body.author_name
            recipe.author_email = req.body.author_email
            recipe.recipe_name = req.body.recipe_name
            recipe.ingredients = req.body.ingredients
            recipe.steps = req.body.steps
            recipe.p_time = req.body.p_time
    try{
      recipe = await recipe.save();
      res.redirect(`/recipes/${recipe.id}`);
    } catch (err) {
        console.log(err);
        res.render(`recipes/${path}`, { recipe: recipe});
    }
    
    }
}

//route to submit and store form info 
// router.post('/', async (req, res) => {
//     let recipe = new Recipe({
//         author_name: req.body.author_name,
//         author_email: req.body.author_email,
//         recipe_name: req.body.recipe_name,
//         ingredients: req.body.ingredients,
//         steps: req.body.steps,
//         p_time: req.body.p_time,
//     });
// try{
//   recipe = await recipe.save();
//   res.redirect(`/recipes/${recipe.id}`);
// } catch (err) {
//     console.log(err);
//     res.render('recipes/create', { recipe: recipe});
// }

// });


module.exports = router;
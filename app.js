const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));



// const Recipe = require("./server/models/Recipe"); // Import the Recipe model from the server folder

// // Route to display the recipe submission form
// app.get("/submit-recipe", (req, res) => {
//   res.render("submit-recipe"); // Renders the submit-recipe.ejs form
// });

// // Route to handle recipe submission
// app.post("/submit-recipe", async (req, res) => {
//   const { email, name, ingredients, description, category } = req.body;

//   try {
//     // Delete any existing recipe with the same email and name
//     await Recipe.deleteOne({ email, recipeName: name });

//     // Insert the new recipe
//     const newRecipe = new Recipe({
//       email,
//       recipeName: name,
//       ingredients,
//       instructions: description,
//       category,
//     });
    
//     await newRecipe.save();

//     res.send("Recipe submitted successfully!");
//   } catch (error) {
//     console.error("Error submitting recipe:", error);
//     res.status(500).send("Error submitting recipe.");
//   }
// });

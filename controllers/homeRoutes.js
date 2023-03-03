const router = require('express').Router();
const { Recipe, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all recipes and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        }
      ],
    });

    // if they are logged in, return user information (and if not ignore this entirely basically)
    var userInformation = async (req, res) => {
      if (req.session.logged_in) {
        const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
        });
    
        const user = userData.get({ plain: true });
  
        return user;
      } else {
        return;
      };
    }

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    console.log(recipes);

    const recentRecipes = recipes.slice((recipes.length - 3), (recipes.length));

    console.log(recentRecipes);

    // Pass serialized data and session flag into template
    res.render('homepage', {
      recentRecipes,
      userInformation,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// load all recipes for the /recipes page
router.get('/recipes', async (req, res) => {
  try {
    // Get all recipes and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
        }
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('recipes', {
      recipes,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to dashboard route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', {
    logged_in: req.session.logged_in,
  });
});

// Use withAuth middleware to prevent access to route (NEED TO ADD BACK)
// get dashboard
router.get('/dashboard', withAuth, async (req, res) => {

  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one particular recipe 
router.get('/recipe/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['id', 'username']
          }
        }
      ],
    });

    const recipe = recipeData.get({ plain: true });

    res.render('single-recipe', {
      ...recipe,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
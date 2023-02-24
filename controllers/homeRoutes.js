const router = require('express').Router();
const { Recipe, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all recipes and JOIN with user data
      const recipeData = await Project.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Comment,
          }
        ],
      });
  
      // Serialize data so the template can read it
      const recipes = recipeData.map((project) => project.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        recipe, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Use withAuth middleware to prevent access to route (NEED TO ADD BACK)
// get dashboard
router.get('/dashboard', async (req, res) => {

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

module.exports = router;
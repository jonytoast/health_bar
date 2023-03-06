const router = require('express').Router();
const { User } = require('../../models');

// Create a user
router.post('/', async (req, res) => {
  try {

    // checks if user already exists in database
    const checkUsername = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    const checkEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    // if sequelize finds duplicate record in database
    if (checkUsername !== null || checkEmail !== null) {

      res.status(409).json({ message: "duplicate record" });
      return;

      // if user's signup info is not in the database yet
    } else {

      // sequelize creates new user data
      const userData = await User.create(req.body);

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json(userData);
      });

    };

  } catch (err) {
    res.status(400).json(err);
  }
});

// Log a user in 
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    console.log(userData);

    if (!userData) {
      res
        .status(400)
        .json({ message: 'No user exists' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    console.log("valid password", validPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

const router = require('express').Router();
const { User } = require('../../models');

// Create new user 
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true; 

      // Good to go
      res.status(200).json(userData);
    });
  } catch (err) {
    // Bad request 
    res.status(400).json(err);
  }
});

// create instance of the user being logged in 
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if(!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, try again' });
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

// End/destroy session 
router.post('/logout', (req, res) => {
  if(req.session.logged_in) {
    req.session.destroy(() => {
      // No content 
      res.status(204).end();
    });

  } else {
    // Not found 
    res.status(404).end();
  }
});

module.exports = router;
const router = require('express').Router();
const { User, Posts } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [{model: User, attributes: ['name']}]
    });

    const posts = postsData.map((post) => post.get({plain: true}));

    res.render('homepage', {
      posts, 
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name']}]
    });

    const post = postData.get({ plain: true});

    res.render('project', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password']},
      include:m[{ model: Posts}]
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
  if(req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router; 
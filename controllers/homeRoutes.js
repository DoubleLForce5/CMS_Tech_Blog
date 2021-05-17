const router = require('express').Router();
const { User, Posts, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [{model: User, attributes: ['username']}]
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

// NEW - duplicate code of the one underneath 
// router.get('/posts', withAuth, async (req, res) => {
//   try {
//     const postData = await Posts.findAll({
//       include: [{ model: Comment, attributes: ['content'] }]
//     });

//     const post = postData.map((post) => post.get({ plain: true }));
//     console.log(post)
//     res.render('post', {
//       post, 
//       logged_in: req.session.logged_in
//     })
//   } catch(err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// })
// NEW

router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username']}],
      include: [{ model: Comment, attributes: ['content'] }]
    });

    const post = postData.get({ plain: true});

    res.render('post', {
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
      include: [{ model: Posts}]
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
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// router.get('/logout', (req, res) => {
//   if()
//   res.render('homepage')
// })

module.exports = router; 
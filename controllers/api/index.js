const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postsRoutes = require('./postsRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/posts', postsRoutes);
router.use('/comment', commentRoutes);

module.exports = router; 
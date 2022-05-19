const router = require('express').Router();

const userRoutes = require('./user-routes');
const countryRoutes = require('./country-routes');
const reviewRoutes = require('./review-routes');
const followRoutes = require('./follow-routes');
const favoriteRoutes = require('./favorite-routes');

router.use('/users', userRoutes);
router.use('/country', countryRoutes);
router.use('/reviews', reviewRoutes);
router.use('/follow', followRoutes);
router.use('/favorite', favoriteRoutes);

module.exports = router;

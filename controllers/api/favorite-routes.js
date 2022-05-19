const router = require('express').Router();
const { UserCountry, Country } = require('../../models');

// The `/api/follow` endpoint

router.post('/', async (req, res) => {
    try {
        console.log('finding movie')
        console.log(req.body.favoriteMovieReform)
        const countryData = await Movie.findOne({
            where: { movie_title: req.body.favoriteMovieReform }
        })
        console.log(countryData)
        let favoriteObject = {
            user_id: req.session.userId,
            country_id: countryData.id,
            has_visited: false
        }
        console.log(favoriteObject)
        const followData = await UserCountry.create(favoriteObject);
        res.status(200).json(followData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
const router = require('express').Router();
const { UserCountry, Country } = require('../../models');

// The `/api/follow` endpoint

router.post('/', async (req, res) => {
    try {
        // console.log('finding country')
        console.log(req.body.favoriteCountryReform)
        const countryData = await Movie.findOne({
            where: { movie_title: req.body.favoriteCountryReform }
        })
        console.log(countryData)
        let favoriteObject = {
            user_id: req.session.userId,
            country_id: countryData.id,
            has_visited: true
        }
        console.log(favoriteObject)
        const followData = await UserCountry.create(favoriteObject);
        res.status(200).json(followData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
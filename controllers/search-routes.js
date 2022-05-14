const router = require('express').Router();
const axios = require('axios');
const { Country, Review, User } = require('../models');

//'/search' endpoint for user serach

router.get('/:countryTitle', (req, res) => {
    let apiUrl = `https://restcountries.com/v3.1/name/${req.params.countryTitle}?fullText=true`
    axios.get(apiUrl)
        .then((response) => {
            let userCountrySearch = {
                countryTitle: response.data.name.common,
                countryCapital: response.data.capital,
                countryRegion: response.data.region,
                countrySubregion: response.data.subregion,
                countryLanguages: response.data.languages,
                countryBorders: response.data.borders,
                currencies: response.data.currencies.this.name,
                flag: response.data.flags.png,
            }

            countryFind(userCountrySearch);
        });

    async function countryFind(userCountrySearch) {
        console.log('Looking for db entry')
        try {
            const data = await Country.findOne({
                where: { country_title: userCountrySearch.countryTitle },
                include: [{ model: Review, include: [{ model: User }, { model: User }] }]
            })

            if (data) {
                const userInfo = data.get({ plain: true })
                const countryID = data.id
                const reviews = userInfo.reviews
                const userId = req.session.userId
                console.log('found entry')
                res.render('', { userCountrySearch, userId, countryID, reviews, loggedIn:req.session.loggedIn });
            } else {
                console.log('no entry found')
                const createdMovie = await Country.create(userCountrySearch)
                const userId = req.session.userId
                const countryID = createdMovie.id
                const reviews = createdMovie.reviews
                res.render('', { userCountrySearch, userId, countryID, reviews, loggedIn:req.session.loggedIn });
            }
        } catch (err) {
            res.render('404')
        }
    };
});

module.exports = router;
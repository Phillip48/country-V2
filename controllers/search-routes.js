// Everything required
const router = require('express').Router();
const axios = require('axios');
const { Country, Review, User } = require('../models');

//'/search' endpoint for user search

// Router to get the movie search
router.get('/:countryTitle', (req, res) => {
    let apiUrl = `https://restcountries.com/v3.1/name/${req.params.countryTitle}?fullText=true`
    // Backend or server side search
    axios.get(apiUrl)
        .then((response) => {
            // Returns the data from the api in an object with the info i need with a callback variable 
            let userCountrySearch = {
                // Matches the columns in the db
                country_title: response.data.name.common,
                capital: response.data.capital,
                region: response.data.region,
                subregion: response.data.subregion,
                languages: response.data.languages,
                borders: response.data.borders,
                currencies: response.data.currencies.this.name,
                country_img: response.data.flags.png,
            }

            // Calls the function to see if this country is already in the database
            // Passes in the country as a parameter
            countryFind(userCountrySearch);
        });

        // async function
    async function countryFind(userCountrySearch) {
        console.log('Looking...')

        try {
            // Trying to find a country by its title in the db
            const data = await Country.findOne({
                where: { country_title: userCountrySearch.country_title },
                include: [{ model: Review, include: [{ model: User }, { model: User }] }]
            })

            // If data is returned from the database then it will get the data
            if (data) {
                const userInfo = data.get({ plain: true })
                const countryID = data.id
                const reviews = userInfo.reviews
                const userId = req.session.userId
                console.log('found entry')
                res.render('homepage', { userCountrySearch, userId, countryID, reviews, loggedIn:req.session.loggedIn });
            } else {
                // If there is no data of this country in the database then it will take the data from the API and create it to the database
                console.log('no entry found')
                const createdMovie = await Country.create(userCountrySearch)
                const userId = req.session.userId
                const countryID = createdMovie.id
                const reviews = createdMovie.reviews
                res.render('homepage', { userCountrySearch, userId, countryID, reviews, loggedIn:req.session.loggedIn });
            }
            // If not a valid country or something goes wrong then it will send you to the 404 page
        } catch (err) {
            res.render('404')
        }
    };
});

// Export the router
module.exports = router;
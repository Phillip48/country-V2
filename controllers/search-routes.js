// Everything required
const router = require('express').Router();
const axios = require('axios');
const { Country, Review, User } = require('../models');

//'/search' endpoint for user search

// Router to get the movie search
router.get('/:countryTitle', (req, res) => {
    let apiUrl = `https://restcountries.com/v3.1/name/${req.params.countryTitle}?fullText=true`
    // console.log("URL", apiUrl);

    // Backend or server side search
    axios.get(apiUrl)
        .then((res) => {
            // console.log('Response....', res.data[0].currencies);
            // console.log(JSON.stringify(res.data[0].currencies));
            testCountryCurrencyString = JSON.stringify(res.data[0].currencies)
            testCountryCurrencySliced = testCountryCurrencyString.slice(7, -1);
            // console.log(testCountryCurrencySliced);
            testCountryCurrencySlicedParsed = JSON.parse(testCountryCurrencySliced)
            // console.log(testCountryCurrencySlicedParsed);

            // console.log('Response....', res.data[0].flags.png);
            // Returns the data from the api in an object with the info i need with a callback variable 
            let userCountrySearch = {
                // Matches the columns in the db
                country_title: res.data[0].name.common,
                capital: res.data[0].capital,
                region: res.data[0].region,
                subregion: res.data[0].subregion,
                languages: res.data[0].languages,
                borders: res.data[0].borders,
                currencies: testCountryCurrencySlicedParsed.name,
                country_img: res.data[0].flags.png,
            }
            // console.log(userCountrySearch);
            countryFind(userCountrySearch);
        });


    // axios.get(apiUrl)
    //     .then((res) => {
    //         console.log('Response....', res.data[0].currencies);
    //         // console.log('Response....', res.data[0].flags.png);
    //         // Returns the data from the api in an object with the info i need with a callback variable 
    //         let userCountrySearch = {
    //             // Matches the columns in the db
    //             country_title: res.data[0].name.common,
    //             capital: res.data[0].capital,
    //             region: res.data[0].region,
    //             subregion: res.data[0].subregion,
    //             languages: res.data[0].languages,
    //             borders: res.data[0].borders,
    //             currencies: res.data[0].currencies.this.name,
    //             country_img: res.data[0].flags.png,
    //         }

    //         // Calls the function to see if this country is already in the database
    //         // Passes in the country as a parameter
    //         countryFind(userCountrySearch);
    //     });

    // async function
    async function countryFind(userCountrySearch) {
        console.log('Looking...')
        // console.log(userCountrySearch);
        try {
            // Trying to find a country by its title in the db
            const data = await Country.findOne({
                where: { country_title: userCountrySearch.country_title },
                include: [{ model: Review, include: [{ model: User }, { model: User }] }]
            })

            // If data is returned from the database then it will get the data
            if (data) {
                console.log('Looking for data:', data);
                const userInfo = data.get({ plain: true })
                const countryID = data.id
                const reviews = userInfo.reviews
                const userId = req.session.userId
                console.log('found entry')
                res.render('homepage', { userCountrySearch, });
            } else {
                // If there is no data of this country in the database then it will take the data from the API and create it to the database
                console.log('no entry found')
                const createdMovie = await Country.create(userCountrySearch)
                const userId = req.session.userId
                const countryID = createdMovie.id
                const reviews = createdMovie.reviews
                res.render('homepage', { userCountrySearch, userId, countryID, reviews, loggedIn: req.session.loggedIn });
            }
            // If not a valid country or something goes wrong then it will send you to the 404 page
        } catch (err) {
            console.log('There was an Error:', err);
            res.render('404')
        }
    };
});

// Export the router
module.exports = router;
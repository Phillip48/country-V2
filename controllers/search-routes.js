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
        .then((res) => {
            // console.log('All data coming back...', res.data);

            //================================== To get the currencies(Crude but done) ==================================//
            testCountryCurrencyString = JSON.stringify(res.data[0].currencies)
            testCountryCurrencySliced = testCountryCurrencyString.slice(7, -1);
            testCountryCurrencySlicedParsed = JSON.parse(testCountryCurrencySliced)
            // console.log('Sliced array...', testCountryCurrencySlicedParsed)
            //========================================================================================//
            //================================== To get the capital(DONE) ==================================//
            countryCapArray = res.data[0].capital;
            const countryCap = Object.assign({}, countryCapArray)
            // console.log('Looking for string...', countryCap)

            //========================================================================================//
            //================================== To get the languages(not done) ==================================//
            countryLanArray = res.data[0].languages;
            console.log('Languages raw data...' ,countryLanArray);

            const mapArray = [countryLanArray].map(({}) => ({}))
            console.log('Languages after...', mapArray);


            let countryLan = Object.assign({}, countryLanArray);
            let countryLanStringify = JSON.stringify(countryLanArray);
            // let countryLanStringifySlice = countryLanStringify.slice(0)
            const countryLanString = countryLanStringify.toString();
            // console.log('Languages after...', countryLan);

            // console.log('Looking for languages in obj...', countryLan)
            // console.log('Looking for...', res.data[0].languages)
            //========================================================================================//
            //================================== To get the borders(Crude but done) ==================================//
            countryBorArray = res.data[0].borders;
            let countryBorString = countryBorArray.toString();
            // console.log('test...' ,countryBorString);
            //========================================================================================//

            // Returns the data from the api in an object with the info i need with a callback variable 
            let userCountrySearch = {
                // Matches the columns in the db
                country_title: res.data[0].name.common,
                capital: countryCap[0],
                region: res.data[0].region,
                subregion: res.data[0].subregion,
                languages: res.data[0].languages,
                borders: countryBorString,
                currencies: testCountryCurrencySlicedParsed.name,
                sideofroad: res.data[0].car.side,
                country_img: res.data[0].flags.png,
            }
            console.log('Object made:', userCountrySearch);
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
                const createdCountry = await Country.create(userCountrySearch)
                const userId = req.session.userId
                const countryID = createdCountry.id
                const reviews = createdCountry.reviews
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
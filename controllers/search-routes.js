// Everything required
const router = require('express').Router();
const axios = require('axios');

const { Country, Review, User } = require('../models');


//'/search' endpoint for user search
// Router to get the movie search
router.get('/:countryTitle', (req, res) => {


    const googleMaps = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB4ei3CuVhlWhedmkq1KWjebDbfLid1j3w&q=${req.params.countryTitle}`;
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
            //================================== To get the languages(Crude but done) ==================================//
            countryLanArray = res.data[0].languages;
            // console.log('Languages raw data...' ,countryLanArray);

            langaugesAfterArray = [];

            // Or for each 
            // used let instead of var
            for (let key in countryLanArray) {
                let value = countryLanArray[key];
                langaugesAfterArray.push(value)
                // console.log('Loop for languages...', value);
            }


            langaugesAfterArrayString = langaugesAfterArray.toString();
            // console.log('String with the languages...', langaugesAfterArrayString);

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
                languages: langaugesAfterArrayString,
                borders: countryBorString,
                currencies: testCountryCurrencySlicedParsed.name,
                sideofroad: res.data[0].car.side,
                country_img: res.data[0].flags.png,
            }
            //  console.log('Object made:', userCountrySearch);
            countryFind(userCountrySearch);
        });

    // async function
    async function countryFind(userCountrySearch) {
        // Google maps 
        const googlemapsLink = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB4ei3CuVhlWhedmkq1KWjebDbfLid1j3w&q=${req.params.countryTitle}`;
        const googleMapsBox =
            `<div class= "google-maps">
                <iframe
                width="280"
                height="300"
                style="border: 1px solid black;"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB4ei3CuVhlWhedmkq1KWjebDbfLid1j3w
                &q=${req.params.countryTitle}">
                </iframe>
            </div>`;

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
                //  took out googleMapsBox from this render
                res.render('homepage', { userCountrySearch, countryID, reviews, userId, googlemapsLink});
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
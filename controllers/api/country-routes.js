const router = require('express').Router();
const { Country, Review } = require('../../models');

// The `/api/country` endpoint

// get Country search results
// this will pull from our Country database and populate our search results handlebars
router.get('/country', async (req, res) => {
    try {
        const countryData = await Country.findAll({
            attributes: ['country_title', 'languages', 'currencies', 'country_img']
        });
        res.status(200).json(countryData);
        res.render('')
        //update to correct handlebar file
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one Country from the Country database and populate our single Country page
// router.get('/countries/:id', async (req, res) => {
//     try {
//         const countryData = await Country.findByPk(req.params.id, {
//             include: [{ model: Review }],
//             attibutes: [
                
//             ],
//         })
//         res.status(200).json(countryData);
//         const singleCountryData = countryData.get({ plain: true });
//         // Update to a handlebar
//         res.render('', singleCountryData);
//         if (!countryData) {
//             res.status(404).json({ message: 'No country found with this id!' });
//             return;
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Post country to db
router.post('/', async (req, res) => {
    try {
        const countryData = await Country.create(req.body);
        res.status(200).json(countryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
const router = require('express').Router();
const { Review, User, Country } = require('../../models');

// The `/api/reviews` endpoint

// get all reviews
router.get('/', async (req, res) => {
    try {
        const countryData = await Review.findAll({
            include: [{ model: User, attributes: ['username'] }, { model: Country, attributes: ['country_title'] }]
        });
        res.status(200).json(countryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one country
router.get('/:id', async (req, res) => {
    try {
        const countryData = await Review.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }, { model: Country, attributes: ['country_title'] }]
        });

        if (!countryData) {
            res.status(404).json({ message: 'No review found with this id!' });
            return;
        }

        res.status(200).json(countryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post country to db
router.post('/', async (req, res) => {
    try {
        const countryData = await Review.create(req.body);

        res.status(200).json(countryData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Updates country based on its id
router.put('/:id', async (req, res) => {
    try {
        const countryData = await Review.update(
            {
                content: req.body.content,
                review_likes: req.body.review_likes,
                user_id: req.body.user_id,
                country_id: req.body.country_id
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!countryData) {
            res.status(404).json({ message: 'No review found with this id!' });
            return;
        }

        res.status(200).json(countryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete country from db by ID
router.delete('/:id', async (req, res) => {
    try {
        const countryData = await Review.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!countryData) {
            res.status(404).json({ message: 'No review found with this id!' });
            return;
        }

        res.status(200).json(countryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
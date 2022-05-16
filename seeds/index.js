const sequelize = require('../config/connection');

const { User, Country, Review, UserCountry, FollowedUser } = require('../models');

const userData = require('./userData.json');
const countryData = require('./countryData.json');
const reviewData = require('./reviewData.json');
const UserCountryData = require('./userCountryData.json');
const followedUserData = require('./followedUserData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Country.bulkCreate(countryData)

  await Review.bulkCreate(reviewData)

  await UserCountry.bulkCreate(UserCountryData)

  await FollowedUser.bulkCreate(followedUserData)

  process.exit(0);
};

seedAll();

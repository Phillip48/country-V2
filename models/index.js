const User = require('./Review');
const Review = require('./Review');
const FollowedUser = require('./FollowedUser');
const Country = require('./Country');
const UserCountry = require('./UserCountry');


// 
Review.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Review, {
    foreignKey: 'user_id',
});

Review.belongsTo(Country, {
    foreignKey: 'country_id',
});

Country.hasMany(Review, {
    foreignKey: 'country_id',
});

// For Followed Users
User.belongsToMany(User, {
    as: "follower",
    foreignKey: 'followee_id',
    through: FollowedUser
});

User.belongsToMany(User, {
    as: "followee",
    foreignKey: 'follower_id',
    through: FollowedUser
});

// Countries to visit
Country.belongsToMany(User, {
    through: {
        model: UserCountry,
        unique: false
    }
});

User.belongsToMany(Country, {
    through: {
        model: UserCountry,
        unique: false
    }
});

module.exports = { User, Country, Review, FollowedUser, UserCountry };

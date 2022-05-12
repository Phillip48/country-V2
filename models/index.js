const User = require('./User');
const Country = require('./Country');
const Review = require('./Review');
const FollowedUser = require('./FollowedUser');

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

//================= Example =================//
// // For to watch movies

// Movie.belongsToMany(User, {
//     through: {
//         model: UserMovie,
//         unique: false
//     }
// });

// User.belongsToMany(Movie, {
//     through: {
//         model: UserMovie,
//         unique: false
//     }
// });

//================= Example =================//
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


// module.exports = { User, Movie, Review, UserMovie, FollowedUser };

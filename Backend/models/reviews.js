const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
    _id: String,
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    userName: String,
    postId: String,
    review: String,
    createdDate: Date,
    profileImg: Object,
});

const Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;
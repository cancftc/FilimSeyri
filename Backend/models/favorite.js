const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    _id: String,
    postId: String,
    userId: {
        type: String,
        required: true,
    },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
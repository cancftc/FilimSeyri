const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    _id: String,
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    name: String,
    profileImg: Object,
    images: Object,

    duration: String,
    actors: String,
    director: String,
    writer: String,
    production: String,
    relaseDate: String,
    videoIframeSrc: String,
    createdDate: Date,
    categories: [{type: String, ref: "Category"}]
});

const Post = mongoose.model("Post",postSchema);

module.exports = Post;
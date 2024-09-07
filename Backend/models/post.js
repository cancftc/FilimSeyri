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
        ref: 'User'  // Kullanıcı referansı
    },
    name: String,
    profileImg: Object,
    images: Object,
    createdDate: Date,
    categories: [{type: String, ref: "Category"}]
});

const Post = mongoose.model("Post",postSchema);

module.exports = Post;
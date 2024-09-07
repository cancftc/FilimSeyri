const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        unique: true
    },
    images: Object,
});

const Category = mongoose.model("Category",categorySchema);

module.exports = Category;
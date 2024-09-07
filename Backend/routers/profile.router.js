const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const {v4:uuidv4} = require("uuid");
const fs = require("fs");
const upload = require("../services/file.service");
const response = require("../services/response.service");
const path = require("path");
const Post = require("../models/post");
const User = require("../models/user");

router.post("/getByProfile", async (req, res) => {
    response(res, async () => {
        const { userId } = req.body;
        const posts = await Post.find({
            userId : userId
        });
        res.json(posts);
    });
});
  
router.post("/getById", async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findOne({ _id: userId });
        
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
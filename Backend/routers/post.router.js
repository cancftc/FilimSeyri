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

router.post("/add",upload.single("images"), async (req, res)=> {
    response(res, async()=>{
        const {title, name, description, userId, categories} = req.body;

        const user = await User.findById(userId);
        const profileImg = user ? user.images : null;
        
            const post = new Post({
                _id: uuidv4(),
                name: name,
                title: title,
                description: description,
                userId: userId,
                categories: categories,
                images: req.file,
                profileImg: profileImg,
            createdDate: new Date()
            });
    
            await post.save();
            res.json({message: "post başarılı"}); 
        }); 
});

router.post("/getAll", async (req, res) => {
    response(res, async () => {
        const { category } = req.body;

        if (!category) {
            return res.status(400).json({ message: "Kategori gerekli" });
        }

        const posts = await Post.find({
            categories: { $regex: category, $options: 'i' }
        });

        res.json(posts);
    });
});

router.post("/getById", async (req, res) => {
    response(res, async () => {
        const { userId } = req.body;
        const posts = await Post.find({
            userId : userId
        });

        res.json(posts);
    });
});

router.post("/getPostDetails", async (req, res) => {
    response(res, async () => {
        const { postId } = req.body;
        const posts = await Post.find({
            _id : postId
        });

        res.json(posts);
    });
});

router.post("/removeById", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;
        const post = await Post.findById(_id);
        
        if (post && post.images && post.images.path) {
            const oldImagePath = path.join(__dirname, "..", post.images.path);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Resim silinirken hata oluştu:", err);
            });
        } else {
            console.warn("Silinecek resim bulunamadı.");
        }

        await Post.findByIdAndDelete(_id);
        res.json({ message: "Post kaydı başarıyla silindi" });
    });
});
  
module.exports = router;
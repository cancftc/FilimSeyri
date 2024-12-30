const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Post = require("../models/post");
const upload = require("../services/file.service");
const path = require("path");
const fs = require("fs");
const Reviews = require("../models/reviews");

const secretKey = "My Secret Key My Secret Key 1234.";
const options = {
    expiresIn: "1d"
};

router.post("/register", async(req, res)=> {
    try {
        const user = new User(req.body);
        user._id = uuidv4();
        user.createdDate = new Date();
        user.isAdmin = false;
        
        const checkUserEmail = await User.findOne({email: user.email});

        if (checkUserEmail != null) {
            res.status(403).json({message: "Bu mail adresi daha önce kullanılmış"});
        }
        else{
            await user.save();
            const token = jwt.sign({},secretKey,options);
            let model = {token: token, user: user};
            res.json(model);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post("/updateProfile", upload.single("images"), async (req, res) => {
    try {
        const { userId, name, biography } = req.body;

        const updatedData = {
            name: name,
            biography: biography,
        };

        if (req.file) {
            updatedData.images = req.file;
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        if (req.file && user.images && user.images.path) {
            const oldImagePath = path.join(__dirname, "..", user.images.path);
            fs.unlink(oldImagePath, () => {});
        }

        await User.findByIdAndUpdate(userId, updatedData, { new: true });

        const updatePosts = {
            name: name,
            profileImg: req.file || user.images,
        };
        await Post.updateMany({ userId: userId }, updatePosts);

        const updateReview = {
            name: name,
            profileImg: req.file || user.images,
        };
        await Reviews.updateMany({ userId: userId }, updateReview);

        res.json({ message: "Profil başarıyla güncellendi" });
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ message: "Sunucu hatası: " + error.message });
    }
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

router.post("/login", async (req, res)=> {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email: email});
        if (user == null) {
            res.status(403).json({message: "Kullanıcı bulunamadı"});
        } else {
            if (user.password != password) {
                res.status(403).json({message: "Şifre yanlış"});
            } else {
                const token = jwt.sign({},secretKey,options);
                let model = {token: token, user: user};
                res.json(model);
            }
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;
const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const upload = require("../services/file.service");
const path = require("path");
const fs = require("fs");

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


// router.post("/updateProfile", upload.single("images"), async (req, res) => {
//     try {
//         const userId = req.body.userId;
//         const updatedData = {
//             name: req.body.name,
//             biography: req.body.biography,
//             images: req.file
//         };

//         const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

//         if (updatedUser) {
//             res.json({ message: "Profil güncellendi", user: updatedUser });
//         } else {
//             res.status(404).json({ message: "Kullanıcı bulunamadı" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

router.post("/updateProfile", upload.single("images"), async (req, res) => {
    try {
        const { userId, name, biography } = req.body;
        const updatedData = {
            name: name,
            biography: biography,
            images: req.file
        };

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        if (req.file) {
            if (user.images && user.images.path) {
                const oldImagePath = path.join(__dirname, "..", user.images.path);
                fs.unlink(oldImagePath, () => {});
            }
            updatedData.images = req.file;
        }

        await User.findByIdAndUpdate(userId, updatedData, { new: true });
        res.json({ message: "Profil başarıyla güncellendi" });
    } catch (error) {
        console.error("Hata:", error); 
        res.status(500).json({ message: "Sunucu hatası: " + error.message });
    }
});

router.post("/getById", async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findOne({ _id: userId }); // _id ile arama yap
        
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
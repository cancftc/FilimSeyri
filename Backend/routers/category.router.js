const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const {v4:uuidv4} = require("uuid");
const fs = require("fs");
const upload = require("../services/file.service");
const response = require("../services/response.service");
const path = require("path");

router.post("/add",upload.single("images"), async (req, res)=> {
    response(res, async()=>{
        const {name} = req.body;
        
        const checkName = await Category.findOne({name: name});
        if (checkName != null) {
            res.status(403).json({message: "Bu kategori adı daha önce kullanılmış"});
        } else {
            const category = new Category({
                _id: uuidv4(),
                name: name,
                images: req.file,
            });
    
            await category.save();
            res.json({message: "Kategori kaydı başarıyla tamamlandı"}); 
        }
    })
});

router.post("/removeById", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;
        const category = await Category.findById(_id);
        
        if (category && category.images && category.images.path) {
            const oldImagePath = path.join(__dirname, "..", category.images.path);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Resim silinirken hata oluştu:", err);
            });
        } else {
            console.warn("Silinecek resim bulunamadı.");
        }

        await Category.findByIdAndDelete(_id);
        res.json({ message: "Kategori kaydı başarıyla silindi" });
    });
});

router.post("/update", upload.single("images"), async (req, res) => {
    response(res, async () => {
        const { _id, name } = req.body;
        const category = await Category.findOne({ _id: _id });

        if (category.name !== name) {
            const checkName = await Category.findOne({ name: name });
            if (checkName != null) {
                return res.status(403).json({ message: "Bu kategori adı daha önce kullanılmış" });
            }
            category.name = name;
        }

        if (req.file) {
            if (category.images && category.images.path) {
                const oldImagePath = path.join(__dirname, "..", category.images.path);
                fs.unlink(oldImagePath, () => {
                });
            }
            category.images = req.file;
        }

        await Category.findByIdAndUpdate(_id, category);
        res.json({ message: "Kategori kaydı başarıyla güncellendi" });
    });
});

router.get("/", async (req, res)=> {
    response(res, async()=>{
        const categories = await Category.find().sort({name: 1});
        res.json(categories);
    })
});

module.exports = router;
const express = require("express");
const router = express.Router();
const response = require("../services/response.service");
const { v4: uuidv4 } = require("uuid");
const Favorite = require("../models/favorite");

router.post("/add", async (req, res) => {
  response(res, async () => {
    const { userId, postId } = req.body;

    const existingFavorite = await Favorite.findOne({
      userId: userId,
      postId: postId,
    });

    if (userId) {
      if (existingFavorite) {
        await Favorite.deleteOne({ _id: existingFavorite._id });
        res.json({ message: "Favoriler'den başarıyla kaldırıldı!" });
      } else {
        let favorite = new Favorite();
        favorite._id = uuidv4();
        favorite.userId = userId;
        favorite.postId = postId;

        await favorite.save();
        res.json({ message: "Favoriler'e başarıyla eklendi!" });
      }
    } else {
        res.json({ message: "Kaydetme işlemi yapılamadı. Lütfen oturum açtığınızdan emin olun." });
    }
  });
});

router.post("/removeById", async (req, res) => {
  response(res, async () => {
    const { _id } = req.body;

    await Favorite.findByIdAndRemove(_id);

    res.json({ message: "Favorilerden başarıyla kaldırdık!" });
  });
});

router.post("/getAll", async (req, res) => {
  response(res, async () => {
    const { userId } = req.body;

    const favorites = await Favorite.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $lookup: {
          from: "posts",
          localField: "postId",
          foreignField: "_id",
          as: "posts",
        },
      },
    ]);

    res.json(favorites);
  });
});

module.exports = router;

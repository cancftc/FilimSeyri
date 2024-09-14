const express = require("express");
const router = express.Router();
const Reviews = require("../models/reviews");
const {v4: uuidv4} = require("uuid");
const response = require("../services/response.service");
const User = require("../models/user");
const upload = require("../services/file.service");

router.post("/add",upload.single("images"), async(req, res)=>{
    response(res, async()=> {
        const {userName, review, postId, userId} = req.body;
        const _id = uuidv4();

        const user = await User.findById(userId);
        const profileImg = user ? user.images : null;

        let reviews = new Reviews({
            _id: _id,
            userId: userId,
            userName: userName,
            review: review,
            createdDate: new Date(),
            postId: postId,
            profileImg: profileImg
        });
        await reviews.save();

        res.json({message: "Yorumunuz başarıyla gönderildi"})
    })
});

router.post("/getAllReviews", async (req, res) => {
    response(res, async () => {
        const { postId } = req.body;
        const reviews = await Reviews.find({
            postId : postId
        }).sort({createdDate: -1});

        res.json(reviews);
    });
});



module.exports = router;
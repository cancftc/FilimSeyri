const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: String,
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    biography: String,
    images: Object,
    isAdmin: Boolean,
    createdDate: Date
})

const User = mongoose.model("User",userSchema);

module.exports = User;

// router.post("/updateProfile", upload.single("images"), async (req, res) => {
//     response(res, async () => {
//         const { _id, name, biography} = req.body;
//         const user = await User.findOne({ _id: _id });

//         if (req.file) {
//             if (user.images && user.images.path) {
//                 const oldImagePath = path.join(__dirname, "..", user.images.path);
//                 fs.unlink(oldImagePath, () => {
//                 });
//             }
//             user.images = req.file;
//         }

//         await User.findByIdAndUpdate(_id, user);
//         res.json({ message: "Profile bilgiler başarıyla güncellendi" });
//     });
// });
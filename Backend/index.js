const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database/db");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRouter = require("./routers/auth.router");
const categoryRouter = require("./routers/category.router");
const postRouter = require("./routers/post.router");
const profileRouter = require("./routers/profile.router");
const reviewRouter = require("./routers/reviews.router");


app.use("/api/auth", authRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/post",postRouter);
app.use("/api/profile",profileRouter);
app.use("/api/review",reviewRouter);


connection();

const port = process.env.PORT || 5000;
app.listen(port,()=> console.log("Uygulama ayağa kalktı.")); 
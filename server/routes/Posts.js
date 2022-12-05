const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/AuthMiddleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[1]
    );
  },
});
const upload = multer({ storage: storage });

const { Posts } = require("../models");
const { Likes } = require("../models");
const { Images } = require("../models");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: "Likes" });

  const likedPosts = await Likes.findAll({ where: { userId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/byId/:id", async (req, res) => {
  const post = await Posts.findByPk(req.params.id);
  res.json(post);
});

router.get("/byUserId/:id", async (req, res) => {
  const listOfPosts = await Posts.findAll({ where: { userId: req.params.id } });
  res.json({ listOfPosts: listOfPosts });
});

router.get("/image/:postId", async (req, res) => {
  const images = await Images.findOne({ where: { postId: req.params.postId } });
  if (images) {
    res.sendFile(__dirname.split("routes")[0] + images.imgUrl);
  } else {
    console.log("No image");
  }
});

router.post("/", validateToken, upload.single("file"), async (req, res) => {
  const { title, postText } = req.body;
  const file = req.file;
  const { filename, path } = file;
  const newPost = await Posts.create({
    title: title,
    postText: postText,
    username: req.user.username,
    UserId: req.user.id,
  });
  if (file) {
    const newImage = await Images.create({
      imgUrl: path,
      imgName: filename,
      PostId: newPost.id,
    });
  }
  res.json({ message: "Post created!", file: file });
});

router.delete("/:id", validateToken, async (req, res) => {
  const post = await Posts.findByPk(req.params.id);
  if (post.username === req.user.username) {
    await post.destroy();
    res.json({ message: "Post deleted!" });
  } else {
    res.json({ message: "Cannot delete post!" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const {validateToken} = require("../middleware/AuthMiddleware");

const {Posts} = require('../models');
const {Likes} = require('../models');

router.get("/", validateToken, async(req,res)=>{
    const listOfPosts = await Posts.findAll({ include: "Likes" });

    const likedPosts = await Likes.findAll({where: {userId: req.user.id}});
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
})

router.get("/byId/:id", async(req,res)=>{
    const post = await Posts.findByPk(req.params.id);
    res.json(post);
})

router.post("/", validateToken, async(req,res)=>{
    const {title, postText} = req.body;
    const newPost = await Posts.create({
        title: title,
        postText: postText,
        username: req.user.username
    });
    res.json({post: newPost, message: "Post created!"});
})

module.exports = router;
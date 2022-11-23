const express = require("express");
const router = express.Router();
const {Comments} = require('../models');
const {validateToken} = require("../middleware/AuthMiddleware");

router.get("/:postId", async(req,res)=>{
    const comments = await Comments.findAll({where:{postId:req.params.postId}});
    res.json(comments);
});

// router.post("/", validateToken, async(req,res)=>{
//     const comment = await Comments.create(req.body);
//     res.json(comment);
// });

router.post("/",validateToken, async(req,res)=>{
    const comment = await Comments.create(req.body);
    res.json(comment);
});

module.exports = router;
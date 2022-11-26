const express = require("express");
const { validateToken } = require("../middleware/AuthMiddleware");
const router = express.Router();

const {Likes} = require('../models');

router.post('/', validateToken,  async (req,res)=>{
    const userId = req.user.id;
    const {postId} = req.body;

    const found = await Likes.findOne({where:{UserId: userId,PostId: postId}});
    if(!found){
        await Likes.create({PostId: postId, UserId: userId})
        res.json({liked: true});
    } else{
        await Likes.destroy({where:{UserId: userId,PostId: postId}});
        res.json({liked: false});
    }
})
module.exports = router;
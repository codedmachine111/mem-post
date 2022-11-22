const {verify} = require("jsonwebtoken");

const validateToken = (req,res,next)=>{
    const accessToken = req.headers("accessToken");

    if(!accessToken){
        return res.json({message: "Access Denied"});
    }

    try{
        const validToken = verify(accessToken,"important");
        if(validToken){
            return next();
        }
    }catch(err){
        return res.json({message: "err"});
    }
}

module.exports = {validateToken};
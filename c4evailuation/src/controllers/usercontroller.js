
const express = require("express");

const User = require("../models/usermodel")

const router = express.Router();

router.post("", async, (req, res)=>{
    try{
        const user = await User.create(req.body)
        return res.status(200).send(user)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }


    
})


module.exports = router;

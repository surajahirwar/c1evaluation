
const express = require("express");
const authenticate = require("../middlewares/authenticate")
const Todo = require("../models/todomodel")

const router = express.Router();

router.get("", authenticate, async, (req, res)=>{
    try{
        const user = await Todo.find()
        return res.status(200).send(user)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }


    
})


router.post("", authenticate, async, (req, res)=>{
        req.body.user_id=req.userId
    try{
        const user = await Todo.create(req.body)
        return res.status(200).send(user)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }


    
})


router.get("/:id",authenticate, async (req, res) => {
    try {
      const user = await Todo.findById(req.params.id)
        .lean()
        .exec();
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  router.patch("/:id", authenticate, async (req, res) => {
    try {
      const user = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  



  
module.exports = router;

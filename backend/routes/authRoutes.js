
const express = require("express");
const router = new express.Router();

const createToken = require("../helpers/token");
const UserModel = require("../models/userModel");

router.post("/token", async (req, res, next)=>{
    try{
        const { username, password } = req.body;
        const user = await UserModel.authenticate(username, password);
        const token = createToken(user);
        // const isAdmin = user.isAdmin;

        // return res.json({ token, user: user.user_id});
        return res.json({token, user});


    }catch(err){
        console.error("Failed to post token on routes", err);
    }
});


router.post("/register", async (req, res, next)=>{
    try{

        console.log("req.body", req.body);
        const newUser = await UserModel.register({ ...req.body});
        const token = createToken(newUser);
        return res.status(201).json({ token });
    
    }catch(err){
        console.error("Failed to register in routes", err)
    }
});


module.exports = router;
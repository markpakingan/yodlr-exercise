const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");


router.get("/admin-list", async (req, res) => {
    try{
        const user = await UserModel.getAllUsers();
        res.json({user});
    }catch(err){
        console.err("Failed to get users routes", err);
    }
});



module.exports = router;
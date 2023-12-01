const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");


router.get("/admin-list", async (req, res) => {
    try{
        const user = await UserModel.getAllUsers();
        res.json({user});
    }catch(err){
        console.error("Failed to get users routes", err);
    }
});

//fetch a user information
router.get("/:user_id", async (req, res) => {
    try{

        const {user_id} = req.params;

        const user = await UserModel.getUser(user_id);
        res.json({user})
    }catch(err){
        console.error("Failed to get user ID", err)
    }
});

router.put("/:user_id", async (req, res) => {
    try{

        const {username, first_name, last_name, email} = req.body;
        const {user_id} = req.params;
        const user = await UserModel.updateUser(username, first_name, last_name, email, user_id);
        res.json({user})
    }catch(err){
        console.error("Failed to update user ID", err)
    }
});

router.delete("/:user_id", async (req, res) => {
    try{

        const {user_id} = req.params;

        const user = await UserModel.deleteUser(user_id);
        res.json({user})
    }catch(err){
        console.error("Failed to delete user ID", err)
    }
});





module.exports = router;
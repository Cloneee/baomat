var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/userModel')
const { hashPassword, comparePassword } = require('../function/hash')
const { createJWT, checkValid } = require('../function/jwt')

router.post('/login', async (req, res, next) => {
    const user = req.body
    const userDB = await userModel.findOne({ username: user.username })
    if (!userDB){
        res.status(400).json("User don't exist")
    }
    else if (comparePassword(user.password, userDB.password)){
        const jwt = createJWT({ username: user.username })
        res.cookie("token", JSON.stringify(jwt), {
            secure: true,
            httpOnly: true,
        }).json({ msg: "Logined", token: jwt })
    }
    else{
        res.status(400).json({msg: "Wrong password"})
    }
});

router.post('/register', async (req, res) => {
    try {
        const data = req.body
        const hash = hashPassword(data.password)
        const newUser = new userModel({ username: data.username, password: hash })
        const jwt = createJWT({ username: data.username })
        await newUser.save()

        res.cookie("token", JSON.stringify(jwt), {
            secure: true,
            httpOnly: true,
        }).json({ msg: "Success register" })
    } catch (error) {
        res.json({msg: "User already exist"})
    }
})

module.exports = router;

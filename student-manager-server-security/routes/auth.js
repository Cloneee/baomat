const express = require('express');
const router = express.Router();
const { hashPassword, comparePassword } = require('../functions/hash')
const axios = require('axios')
const userModel = require('../models/userModel')


// * Login register section
router.post('/login', async (req, res, next) => {
    const user = req.body
    const userDB = await userModel.findOne({ username: user.username })
    if (!userDB) {
        res.status(400).json({ msg: "User don't exist" })
    }
    else if (comparePassword(user.password, userDB.password)) {
        axios.post("http://localhost:8000/api/v1/jwt", { name: user.username, username: user.username, role: user.role })
            .then(respone => {
                const jwt = respone.data
                res.cookie("token", JSON.stringify(jwt), {
                    secure: true,
                    httpOnly: true,
                }).json({ msg: "Hello " + userDB.name, name: userDB.name })
            })
            .catch(err => res.status(400).json({ err: err }))
    }
    else {
        res.status(400).json({ msg: "Wrong password" })
    }
});

router.post('/register', async (req, res) => {
    try {
        const data = req.body
        const hash = hashPassword(data.password)
        const userDB = await userModel.findOne({ username: data.username })
        if (!userDB) {
            const newUser = new userModel({ name: data.name, username: data.username, password: hash, role: data.role ? data.role : 'student' })
            await newUser.save()
            res.json({ msg: "Success register" })
        }
        else {
            res.status(400).json({ err: "User already exist" })
        }
    } catch (error) {
        res.status(400).json({ err: "Error while register" })
    }
})

module.exports = router;

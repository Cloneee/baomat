const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/userModel')
const { hashPassword, comparePassword } = require('../functions/hash')
const axios = require('axios')
const departmentModel = require('../models/departmentModel')

// Query: sort, filter, page, limit
router.get('/user', async (req, res) => {
    try {
        let page = req.query.page ? Number(req.query.page) : 1,
            limit = req.query.limit ? Number(req.query.limit) : 20
        Promise.all([
            userModel.find()
                .sort({ role: 1, createDate: req.query.sort === 'desc' ? -1 : 1 })
                .select({ __v: false, password: false, createDate: false })
                .limit(limit)
                .skip((page - 1) * limit),
            userModel.count()
        ]).then(([data, total])=>res.json({ currentPage: page, limit: limit, totalPage: total, data: data }))
    } catch (error) {
        res.status(400).json({ err: "Unexpected error" })
    }
});

router.get('/user/:username', async (req, res) => {
    try {
        const username = req.params.username
        const user = await userModel.findOne({ username: username }).select({__v: false, createDate: false, password: false})
        user ? res.status(200).json(user) : res.status(404).json({ msg: 'User not found' })
    } catch (error) {
        res.status(400).json({ err: "Unexpeted error" })
    }
})

// * Department section
router.get('/department', async (req, res) => {
    departmentModel.find().select({ _id: false, __v: false })
        .then(docs => res.json(docs.map(el => el.name))) // Chuyển object department thành array
        .catch(err => res.status(400).json({ err: "Something wrong" }))
})

router.post('/department', async (req, res) => {
    const name = req.body.name
    departmentModel.create({ name: name })
        .then(docs => res.json({ msg: "Created department", value: name }))
        .catch(err => res.status(400).json({ err: err.code == 11000 ? { name: "Duplicate value", value: name } : "Unexpected error" }))
})

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

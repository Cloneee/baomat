const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/userModel')
const departmentModel = require('../models/departmentModel')
const { isAdmin, isUser } = require('../functions/authMiddleware')

// Query: sort, filter, page, limit
router.get('/user', isAdmin, async (req, res) => {
    try {
        let page = req.query.page ? Number(req.query.page) : 1,
            limit = req.query.limit ? Number(req.query.limit) : 20
        page < 1 || isNaN(page) ? page = 1 : null
        limit < 1 || isNaN(limit) ? limit = 20 : null

        Promise.all([
            userModel.find()
                .sort({ role: 1, createDate: req.query.sort === 'desc' ? -1 : 1 })
                .select({ __v: false, password: false })
                .limit(limit)
                .skip((page - 1) * limit)
                .populate('department'),
            userModel.count()
        ]).then(([data, total]) => res.json({ currentPage: page, limit: limit, totalPage: total % limit != 0 ? parseInt(total / limit + 1) : total / limit, data: data }))
    } catch (error) {
        res.status(400).json({ err: "Unexpected error" })
    }
});

router.route('/user/:username', isUser)
    .get(async (req, res) => {
        try {
            const username = req.params.username
            const user = await userModel.findOne({ username: username }).select({ __v: false, password: false }).populate('department')
            user ? user.department = user?.department?._id : null
            user ? res.status(200).json(user) : res.status(404).json({ msg: 'User not found' })
        } catch (error) {
            res.status(400).json({ err: "Unexpeted error" })
        }
    })
    .put(async (req, res) => {
        try {
            let user = await userModel.findOne({ username: req.params.username })
            let newData = {
                name: req.body.name,
                mssv: req.body.mssv,
                class: req.body.class,
                department: req.body.department,
                description: req.body.description,
                role: req.body.role
            }
            Object.keys(newData).forEach(function (key) {
                newData[key] ? user[key] = newData[key] : null
            })
            user.updateDate = Date.now()
            await user.save()
            res.json({ msg: "Success edit profile" })
        } catch (error) {
            res.status(400).json({ err: "Unexpeted error" })
        }
    })
    .delete(async (req, res) => {
        try {
            userModel.deleteOne({ username: req.params.username })
                .then(resp => res.json({ msg: "Deleted " + req.params.username, value: req.params.username }))
        } catch (error) {
            res.status(400).json({ err: "Unexpeted error" })
        }
    })

// * Department section
router.route('/department')
    .get(async (req, res) => {
        departmentModel.find().select({ __v: false })
            .then(docs => res.json(docs))
            .catch(err => res.status(400).json({ err: "Something wrong" }))
    })
    .post(isAdmin, async (req, res) => {
        const name = req.body.name
        departmentModel.create({ name: name })
            .then(docs => res.json({ msg: "Created department", value: name }))
            .catch(err => res.status(400).json({ err: err.code == 11000 ? { name: "Duplicate value", value: name } : "Unexpected error" }))
    })



module.exports = router;

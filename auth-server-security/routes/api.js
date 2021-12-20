var express = require('express');
var router = express.Router();
const { createJWT, checkValid } = require('../functions/jwt')

router.post('/jwt', async (req, res) => {
    try {
        const jwt = createJWT({ name: req.body.name, username: req.body.username, role: req.body.role })
        res.json({ token: jwt })
    } catch (error) {
        res.status(400).json({ msg: "Error while creating jwt" })
    }
})

router.post('/auth', (req,res)=>{
    try {
        res.json(checkValid(req.body.token))
    } catch (error) {
        res.status(400).json({msg: "error"})
    }
})

module.exports = router;

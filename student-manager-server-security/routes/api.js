const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res, next) {
    let query = req.query
    let sort = query.sort || "asc"
    
    let result = {data: sort}
    res.json(result);
});

module.exports = router;

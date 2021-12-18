const jwt = require('jsonwebtoken')

const createJWT = (data) => jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1d' })

const checkValid = (token) => jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    return !err ? decoded : {err: err}
})

module.exports = { createJWT, checkValid }
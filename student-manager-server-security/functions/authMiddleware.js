const axios = require('axios')

const decodeJWT = (token) => 
    axios.post('http://localhost:8000/api/v1/auth', { token: token }).then(resp => resp.data)


const isAdmin = async (req, res, next) => {
    let decoded = await decodeJWT(req.cookies.token)
    console.log(req.headers)
    decoded.role == 'admin' ? next() : res.status(401).json({ err: "Permission required" })
}

const isUser = async (req, res, next) => {
    let decoded = await decodeJWT(req.cookies.token)
    decoded.username == req.params.username || decoded.role == 'admin' ? next() : res.status(401).json({ err: "Permission required" })
}

module.exports = { isAdmin, isUser }
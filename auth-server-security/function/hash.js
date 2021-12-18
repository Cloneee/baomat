const bcrypt = require('bcrypt')

const hashPassword = (rawPassword) => bcrypt.hashSync(rawPassword, 10)

const comparePassword = (rawPassword, hashedPassword) => bcrypt.compareSync(rawPassword, hashedPassword)

module.exports = { hashPassword, comparePassword }
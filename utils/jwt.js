const jwt = require('jsonwebtoken')


const verify = async token => {
    return await jwt.verify(token, process.env.SEKRET_KEY)
}

module.exports = {
    verify
}
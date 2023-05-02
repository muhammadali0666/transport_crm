const jwt = require('jsonwebtoken')


const verify = async token => {
    return await jwt.verify(token, "SIRLI")
}

module.exports = {
    verify
}
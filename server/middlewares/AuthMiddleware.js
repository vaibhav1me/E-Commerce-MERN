const jwt = require('jsonwebtoken') 

// Todo
const authenticateUser = (req, res, next) => {
    const { token } = req.body
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.json({message: "Error with token"})
            } 
            else {
                // console.log(decodedToken)
                next()
            }
        })
    }
    else {
        res.json({message: "Token does not exist. Hence user not logged in"})
    }
}

const checkCurrentUser = (req, res) => {
    const {token} = req.body
    // console.log(token)
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.json({message: "Token expired"})
            }
            else {
                // console.log(decodedToken)
                res.json(decodedToken)
            }
        })
    }
    else {
        // console.log(req.cookies)
        // console.log(req.body)
        res.json({message: "User not logged in"})
    }
}

module.exports = {authenticateUser, checkCurrentUser}
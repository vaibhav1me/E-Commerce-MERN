const jwt = require('jsonwebtoken') 

// Todo
const authenticateUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.json({message: "User not logged in"})
            } 
            else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

const checkCurrentUser = (req, res) => {
    const {token} = req.body
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.json({message: "Token expired"})
            }
            else {
                console.log(decodedToken)
                res.json(decodedToken)
            }
        })
    }
    else {
        // console.log(req.cookies)
        console.log(req.body)
        res.json({message: "User not logged in"})
    }
}

module.exports = {authenticateUser, checkCurrentUser}
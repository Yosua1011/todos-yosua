const jwt = require('jsonwebtoken')
const Todo = require('../models/Todo')
require('dotenv').config()
const env = process.env.NODE_ENV || "development"


const isLogin = (req,res,next) => {
    if(req.headers.token !== null) {
        jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
            console.log('ini decoded',decoded)
            if (err) {
                res.send(err)
            } else {
                req.headers = decoded
                next()
            }
        })
    } else {
        res.send({msg: 'Please Login First'})
    }
}

const isUserAuth = (req,res,next) => {
    if(req._id == req.headers._id) {
        next()
    } else {
        res.send('Kamu tidak berhak mengakses data orang lain')
    }
}

module.exports = {
  isLogin,
  isUserAuth
}

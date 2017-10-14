const FB = require('fb')
const User = require('../models/User')
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')
require('dotenv').config()
// const env = process.env.NODE_ENV || "development"
var bcrypt = require('bcryptjs')

module.exports = {
    findAllUsers: function(req, res) {
        User.find()
        .then(data_users => {res.send(data_users)})
        .catch(err => res.send(err))
      },

    findSpecificUser: function(req, res) {
        User.findById(req.params.id)
        .then(data_user => {res.send(data_user)})
        .catch(err => res.send(err))
    },

    deleteSpecificUser: function(req, res) {
        User.remove({
            _id: req.params.id
        })
        .then(userDeleted => {
            res.send(`User deleted`)
        })
        .catch(err => {
            res.send(err)
        })
    },

    editSpecificUser: function(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            res.send(`User sudah terupdate`)
        })
        .catch(err => {
            res.send(err)
        })
    },

    setFBAccessToken: (req, res, next) => {
        FB.setAccessToken(req.headers.fbaccesstoken);
        next()
    },

    loginUser: function(req,res) {
        User.findOne({facebookId: req.headers.fbid})
        .then(user => {

            if (user == false) {
                FB.api('/me', response => {
                    User.create({
                        facebookId: response.id,
                        name: response.name
                    })
                    .then(createdUser => {
                        console.log('this is createdUser' + createdUser)
                        const token = jwt.sign({
                            _id: createdUser._id,
                            name: createdUser.name
                        }, process.env.JWT_SECRET)
                        res.send(token)
                    })
                    .catch(err => res.send(err))
                })
            } else {
                console.log('this is user ' + user)
                const token = jwt.sign({
                    _id: user._id,
                    name: user.name
                }, process.env.JWT_SECRET)
                // res.send(token)
                res.send({token: token, name: user.name, userid: user._id})
            }
        })
        .catch(err => res.send(err))

    },

    getUserFB: (req,res) => {
      FB.api('/me',{fields: ['id','name','email']}, response => {
        res.send(response)
      })
    }
}

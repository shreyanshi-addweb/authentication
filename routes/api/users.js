const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const User = require("../../model/User");

router.post('/register', (req,res) => {
    let {
        firstname,
        lastname,
        email,
        phone,
        password,
        confirm_password,

    } = req.body
    if(password !==confirm_password){
        return res.status(400).json({
            message: "password doesn't match..!!"
        });
    }
    User.findOne({
        email: email
    }).then(user => {
        if(user){
            return res.status(400).json({

                message: "Email is already register"
            })
        }
    });
    let newUser = new User({
        firstname,
        lastname,
        email,
        phone,
        password
    });

    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            if(error) throw error;
            newUser.password = hash;
            newUser.save().then(user => {
                return  res.status(200).json({
                    success: true,
                    message: "user is now registered..!!"
                });
            });
        });
    });
});

router.post('/login',(req,res) => {
    User.findOne({ email: req.body.email}).then(user => {
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone
                }
                jwt.sign(payload, key, { expiresIn: 604800}, 
                    (error, token) => {
                        res.status(200).json({
                            success: true,
                            
                            token: `Bearer ${token}`,
                            user: user,
                            message: "You are now logged In..!!"
                        });
                    });
            }else{
                return res.status(404).json({
                    message: "incorrect password",
                    success: false
                });
            };
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req,res) => {
    return res.json({
        user: req.user
    });
});
module.exports = router;
const jwt = require('jsonwebtoken');
// require('dotenv').config()
const expressJwt = require('express-jwt');
const User = require("../models/user");

exports.signup = async (req,res) => {
    const userExits = await User.findOne({email: req.body.email})
    if (userExits) return res.status(403).json({
        error: "Email is taken!"
    })
    const user = await new User(req.body)
    await user.save();
    res.status(200).json({ message: "signup success! please login" });
};

exports.signin = (req,res) => {
    // find the user based on email
    const {_id, email, password} = req.body
    User.findOne({email}, (err,user)=> {
        // if err or no user
        if (err || !user) {
            return res.status(401).json ({
                error: "User With that email does not exist. please signin"
            });
        }
        // if user is found make sure the email and password match
        // create autenitcate method in model and use here
        if (!user.authenticate(password)) {
            return res.status(401).json ({
                error: "email and password do not match!"
            });
        }
        //generate a toekn with user id and sevret
        const token = jwt.sign({_id: user._id}, 'JKASDJLASKDJALSKDJKALSDJ')
        //presist the toekn as 't' in cookie with expiry date
        res.cookie("t", token, {expire: new Date()+ 9999})
        // return response with user and token to frontend client
        const {_id, name, email} = user
        return res.json ({token, user: {_id, email, name}});
    });
};


exports.signout = (req,res) => {
    res.clearCookie("t");
    return res.json({
        message: "Signout Success!"
    });
};

exports.requireSignin = expressJwt({
    // if the token is valid, express jwt appends the verified users id 
    // in the auth key to the requset object
    secret: 'JKASDJLASKDJALSKDJKALSDJ',
    userProperty: "auth"

});
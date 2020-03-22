const express = require('express');
const {createPost , getPosts} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const {createPostValidator} = require('../validator');
const {userById} = require('../controllers/user');

const router = express.Router();

router.get("/", getPosts);
router.post("/post",requireSignin, createPostValidator , createPost);

//any routes conataitng user id, our app will first execute userById function
router.param("userId", userById);



module.exports = router;

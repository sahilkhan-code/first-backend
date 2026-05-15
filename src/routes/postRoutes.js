const express = require('express');

const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const {createPost} = require('../contollers/postController')

router.post('/create',authMiddleware,createPost)

module.exports = router;
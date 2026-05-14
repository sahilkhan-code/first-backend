const express = require('express');
const route = express.Router()

const router = express.Router();

const {getprofile,getCurrentUser} = require('../contollers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/profile', getprofile)
router.get('/currentUser', authMiddleware ,getCurrentUser)

module.exports = router;
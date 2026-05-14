const express = require('express');

const router = express.Router();

const {registerUser} = require('../contollers/registerUserContoller')

router.post('/', registerUser)

module.exports = router;

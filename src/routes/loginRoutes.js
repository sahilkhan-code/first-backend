const express = require('express');
const router = express.Router();

const {loginUser} = require('../contollers/loginController')

router.post('/', loginUser)

module.exports = router;
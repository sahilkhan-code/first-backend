const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginUser = async (req, res) => {

    try {

        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'Email and password are required',
                success: false
            });
        }

        const userData = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })

        console.log('userData', userData)
        console.log('req.body', req.body)

        if (!userData) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
       console.log('req.body.password, userData.password',req.body.password,'vvv', userData.password)
        const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Password is incorrect',
                success: false
            });
        }

        const token = jwt.sign(
            { userId: userData.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' })

        res.status(200).json({
            message: 'Login successful',
            success: true,
            token
        })
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while logging in',
            error: error.message,
            success: false
        })
    }
}

module.exports = {
    loginUser
}
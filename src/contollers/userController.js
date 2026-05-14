const getprofile = (req, res) => {
    res.json({
        message: 'UserProfile data from controller'
    })
}

const prisma = require('../config/prisma');

const getCurrentUser = async (req, res) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server error'
        });

    }

};

module.exports={
    getprofile,
    getCurrentUser
}


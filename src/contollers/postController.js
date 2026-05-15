const prisma = require('../config/prisma');

const createPost = async (req, res) => {
    console.log('req.body', req.body)
    console.log('req.user', req.user)

    try {

        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: 'Title and content are required',
                success: false
            })
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                userId: req.user.userId
            }
        })


        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId
            },
            include: {
                posts: true
            }
        });

        console.log('userrr', user)

        res.status(201).json({
            message: 'Post created successfully',
            success: true,
            post
        })

    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }

}

module.exports = {
    createPost
}
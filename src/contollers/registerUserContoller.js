
const prisma = require('../config/prisma');
const { encrypt } = require('../utils/encrypt');
const { registerSchema } = require('../validators/authValidator');
const registerUser = async (req, res) => {

  console.log('reqBody', req.body)

  try {

    const validateSchema = registerSchema(req.body);

    console.log('vaidateSchema', validateSchema)

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All Fileds are required",
        success: false
      })
    }

    const hashedPassword = await encrypt(password);

    const user = await prisma.user.create({
      data: {
        name, email, password: hashedPassword
      }
    })

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user
    })

  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        errors: error.issues
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
      success: false
    })
  }
}
module.exports = {
  registerUser
}
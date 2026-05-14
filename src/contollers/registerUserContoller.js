
const prisma = require('../config/prisma');
const { encrypt } = require('../utils/encrypt');
const registerUser = async (req,res)=>{

    console.log('reqBody',req.body)

    try{

      const {name,email,password} = req.body;
      
      if(!name || !email || !password){
        return res.status(400).json({
            message:"All Fileds are required",
            success: false
        })
      }

      const hashedPassword = await encrypt(password);

      const user = await prisma.user.create({
        data:{
            name,email,password:hashedPassword
        }
      })

      res.status(201).json({
        message: "User registered successfully",
        success: true,
        user
      })

    }catch(error){
      res.status(500).json({
        message:"Internal Server Error",
        success: false
      })
    }
}
module.exports={
    registerUser
}
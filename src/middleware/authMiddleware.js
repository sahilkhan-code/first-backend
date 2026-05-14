const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
try{
  const authHeader = req.headers.authorization;
       
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'No Token Provided',
            success: false
        });
    }

    const token = authHeader.split(' ')[1]

    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);


    req.user = decode;

    next();


}catch(error){
    res.status(401).json({
        message: 'Unauthorized',
        success: false,
        error: error.message
    })
}
}

module.exports = {
    authMiddleware
}

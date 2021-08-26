const jwt = require('jsonwebtoken')

const auth = async(req,res,next)=>{
    try {
        let authHeader = req.headers['authorization']
        if(authHeader){
            let token = authHeader.split(" ")[1];
            let isVerify = await jwt.verify(token , process.env.SECRET_KEY)
            if(isVerify){
                req.user = isVerify
                next()
            } else{
                res.status(403).json({message:'token expired'})
            }
        } else{
            res.status(401).json({message:'access denied'})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = auth;
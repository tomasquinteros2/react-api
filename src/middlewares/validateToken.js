const jwt = require("jsonwebtoken")

module.exports = {
    authRequired: (req,res,next)=>{
        console.log("validing token")
        try{
            const {token} = req.cookies
            console.log(token)
            if(!token) return res.status(401).json({message:"No token, authorization denied"})
            
            jwt.verify(token, 'secret123',(err,acount)=>{
                if(err) return res.status(403).json({message:"Invalid token"})
                console.log(acount)
                req.user = acount
                next()
            })
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
        
    }
}
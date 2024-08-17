const jwt = require("jsonwebtoken");

const validateToken=(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token=authHeader.split(" ")[1];
        jwt.verify(token ,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err)
            {
                return res.status(401).json("Not authorized");
                
            }
            console.log(decoded);
            req.user = decoded;
            next();
        });
        
    } else {
       return res.status(401).json({ message: "No token, authorization denied" });
    }
};
module.exports=validateToken;
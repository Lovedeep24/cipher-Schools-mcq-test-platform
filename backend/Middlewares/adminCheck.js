

// const adminCheck = (req, res, next) => {
//     const authHeader = req.headers.Authorization || req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//    const token = authHeader.split(' ')[1];
//     // if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
//     // console.log("Entered check");
//     try {
//       const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//       if (decoded.role !== 'Admin') 
//     {
//       return res.status(403).json({ message: 'User is not an admin' });
//     }
//       req.user = decoded;
//       console.log("check passed");
//       next();
//     } catch (err) {
//       res.status(400).json({ message: 'Token is not valid' });
//     }
// };
const jwt = require("jsonwebtoken");

const adminCheck = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const { role } = req.user.user; // Access role from decoded token

    if (role !== 'Admin') {
        return res.status(403).json({ message: 'User is not an admin' });
    }

    next();
};

module.exports = adminCheck;

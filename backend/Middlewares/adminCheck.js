const jwt = require("jsonwebtoken");

const adminCheck = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const { role } = req.user; 
    if (role !== 'Admin') {
        return res.status(403).json({ message: 'User is not an admin' });
    }

    next();
};

module.exports = adminCheck;

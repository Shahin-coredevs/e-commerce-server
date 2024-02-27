const jwt = require('jsonwebtoken');
const { userCollection } = require('../utils/Database');

async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.cookie.split('=')[1];
        const decode = jwt.verify(token, 'itsnothing');
        const user = await userCollection.findOne({ email: decode.email }, { projection: { password: 0 } });
        req.user = user;
        return next();
    } catch {
        return res.status(401).send("User Unauthorised");
    }
}

module.exports = authMiddleware;

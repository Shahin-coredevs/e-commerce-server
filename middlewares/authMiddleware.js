const jwt = require('jsonwebtoken');
const userSchema = require('../Schemas/userSchema');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.cookie.split('=')[1];
        const decode = jwt.verify(token, process.env.token_Secret);
        const user = await userSchema.findOne({ email: decode.email }, { projection: { password: 0 } });
        req.user = user;
        return next();
    } catch (e) {
        console.log(e);
        return res.status(401).send("User Unauthorised");
    }
}



module.exports = authMiddleware;

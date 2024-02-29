const jwt = require('jsonwebtoken');
const { userCollection } = require('../utils/Database');

const sellerChecker = async (req, res, next) => {
    try {
        if (req.user.role === "seller") {
            return next()
        }
        else {
            return res.status(400).send({ reason: 'Bad Request' });
        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }

}

module.exports = sellerChecker;
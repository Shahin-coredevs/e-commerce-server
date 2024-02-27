const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const { userCollection } = require('../utils/Database');

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await userCollection.findOne({ email });
        if (!user) return res.status(404).send("User Not Found");

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).send("User Unauthorised");

        const token = jwt.sign({ email, id: user._id }, 'itsSecret');
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('token').send({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

async function me(req, res) {
    try {
        return res.status(200).send(req.user);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = { login, logout, me };

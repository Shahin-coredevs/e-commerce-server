const userChecker = async (req, res, next) => {
    try {
        if (req.user.role === "user") {
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

module.exports = userChecker;
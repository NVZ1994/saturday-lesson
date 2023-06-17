const jwt = require("jsonwebtoken")
const User = require("../db/models/userModel")

const {SECRET_KEY} = process.env;


async function userAuth (req, res,next){
    const {authorization = ""} = req.headers
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        res.status(401).json({ message: "not authorized" });
        return
    }
    try {
        const {id} = jwt.verify(token,SECRET_KEY )
        const user = await User.findById(id)
        if (!user || !user.token || user.token !== token) {
            res.status(401).json({ message: "not authorized" });
            return
        }
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = userAuth;
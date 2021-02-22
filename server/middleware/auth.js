const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    try {
        const token = req.headers('x-auth-token');
        const verified = jwt.verify(token, provess.env.JTW_SECRET)

        if (!token) {
            return res.status(401).json({msg: "No authentication token, access autherization denied"})
        }

        if (!verified) {
            return res.status(401).json({msg: "No verification failed, autherization denied"})
        }

        req.user = verified.id
        next()

    } catch (err) {
        res.status(500).json({err: err.message})
    }
}

module.exports = auth
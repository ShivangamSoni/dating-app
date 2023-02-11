const { verify } = require("jsonwebtoken");

exports.authRequired = function (req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ message: "Invalid Request" });
    }

    const [bearer, token] = authorization.split(" ");
    if (token === undefined || token === "" || bearer !== "Bearer") {
        return res.status(401).send({ message: "Invalid Request" });
    }

    try {
        const payload = verify(token, process.env.JWT_KEY);
        req.payload = payload;
        next();
    } catch {
        return res.status(401).json({
            message: "Token Expired",
        });
    }
};

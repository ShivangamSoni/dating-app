const { sign } = require("jsonwebtoken");

exports.signJwt = function (id) {
    const payload = {
        sub: id,
    };

    return sign(payload, process.env.JWT_KEY, {
        expiresIn: "2d",
    });
};

const jwt = require("jsonwebtoken");

function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, 'secret123', {expiresIn: 80000}, (err, token) => {
            if (err) {
                console.error("Error creating token:", err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = createAccessToken;

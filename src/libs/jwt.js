const jwt = require("jsonwebtoken");

function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign({
            payload,
        }, 'secret123', {
            expiresIn: "1d",
        }, (err, token) => {
            if (err) {
                console.error("Error creating token:", err);
                reject(err);
            } else {
                // Establecer la cookie con el token
                document.cookie = `token=${token}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`; // expire in 1 day
                resolve(token);
            }
        });
    });
}


module.exports = createAccessToken;

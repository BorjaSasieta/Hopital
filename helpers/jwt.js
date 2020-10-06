const jwt = require('jsonwebtoken');

const generarToken = (uid) => {
    return new Promise( (resolve, reject) => {
        const payload = {
            uid
        };
        jwt.sign(payload, process.env.PASSTOKEN, { expiresIn: '9h'}, (error, token) => {
            if(error) {
                console.log(error);
                reject("no s'ha poguit generar el token");
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarToken
}

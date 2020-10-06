const jwt = require("jsonwebtoken");


const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: "no n'hi ha cap token"
        });
    }
    try{
       const { uid } = jwt.verify(token, process.env.PASSTOKEN);
       req.uid = uid;
       next();
    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: "el token no es correcte"
        });
    }
}

module.exports = {
    validarJWT
};

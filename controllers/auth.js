const { response } = require("express");
const encriptar = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarToken } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
    try{
        const usuariodb = await Usuario.findOne({ email: req.body.email });

        if (!usuariodb) {
            res.status(404).json({
                ok: false,
                msg: 'email y/o contraseña no validas'
            });
        }

        const validPss = encriptar.compareSync(req.body.password, usuariodb.password);

        if (!validPss){
            res.status(404).json({
                ok: false,
                msg: 'email y/o contraseña no validas'
            });
        }

        const token = await generarToken(usuariodb.id);

        res.json({
            ok: true,
            token
        });
    }catch(error){
        res.status(500).json({
            ok: false,
            msg: "error inesperat parli amb el seu administrador de sistemes"
        });
    }
}

const googleSignIn = async (req, res = response) => {
    const googleToken = req.body.token;
    console.log(googleToken);
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const usuariodb = await Usuario.findOne({ email: email });
        let usuario;
        if (!usuariodb) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                imagen: picture,
                google: true                
            });
        } else{
            usuario = usuariodb;
            usuario.google = true;
            usuario.password = '@@@';
        }
        await usuario.save();
        const token = await generarToken(usuario.id);
        return res.json({
            ok: true,
            token
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'el token no es correcto'
        });
    }
}

const reNewToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await generarToken(uid);
    res.json({
        ok: true,
        token
    })
}

module.exports = {
    login,
    googleSignIn,
    reNewToken
}

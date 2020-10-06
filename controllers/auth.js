const { response } = require("express");
const encriptar = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarToken } = require("../helpers/jwt");

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

module.exports = {
    login
}

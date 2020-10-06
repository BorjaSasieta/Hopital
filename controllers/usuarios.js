const Usuario = require('../models/usuario');
const { response } = require('express');
const encriptar = require('bcryptjs');
const { generarToken } = require("../helpers/jwt");


const getUsuarios = async (request, res = response) => {
    const usuarios = await Usuario.find({}, 'nombre email google rol');

    res.json({ ok: true,
                usuarios,
                uid: request.uid });
}

const crearUsuario = async (request, res = response) => {
    try {
        const existeixMail = await Usuario.findOne({ email: request.body.email});
        if (existeixMail) {
            return res.status(400).json({
                ok: false,
                msg: "ja existeix un usuari amb aquest mail"
            });
        }
        const usuario = new Usuario(request.body);
        const salt = encriptar.genSaltSync();
        usuario.password = encriptar.hashSync(request.body.password, salt);
        await usuario.save();
        const token = await generarToken(usuario.id);
        res.json({ ok: true,
                   token});

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error inesperat"
        });
    }
}

const actulizarUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no existeix l\'usuari'
            });
        }
        const { password, google, email, ...campos } = req.body;
        if(usuarioDB.email === email){
            delete campos.email;
        }else {
            const existeix = Usuario.findOne({ email });
            if (existeix) {
                return res.status(400).json({
                    ok: false,
                    msg: "ja existeix un usuari amb aquest mail"
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        const token = await generarToken(usuarioActualizado.id);
        res.json({
            ok: true,
            token
        });
    }catch(error) {
        return res.status(400).json({
            ok: false,
            msg: 'error inesperado'
        });
    }
}

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {
        await Usuario.findByIdAndDelete(uid);
        return res.status(400).json({
            ok: true,
            msg: "l'usuari s'ha esborrat" 
        });
    }catch(error) {
        return res.status(400).json({
            ok: false,
            msg: 'error inesperado'
        });
    }    
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actulizarUsuario,
    borrarUsuario
}

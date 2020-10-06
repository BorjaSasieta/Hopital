const { response } = require("express");
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find().populate('usuario','nombre imagen').populate('hospital', 'nombre imagen');
    return res.status(200).json({
        ok: true,
        medicos
    });
};

const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({usuario:uid, ...req.body});
    try{
        if(!medico.hospital){
            return res.status(401).json({
                ok: false,
                msg: "no tiene n hospital relacionado"
            });
        }
        const medicoDB = await medico.save();
        return res.status(200).json({
            ok: true,
            medico: medicoDB
        });
    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "hable con el administrador"
        });
    }
};

const actualizarMedico = (req, res = response) => {
    
};

const borrarMedico = (req, res = response) => {
    
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}

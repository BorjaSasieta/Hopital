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

const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            res.status(404).json({
                ok: false,
                msg: "no existe este medico"
            });
        }
        const cambioMedico = {
            ...req.body,
            usuario: uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambioMedico, { new: true });
        res.json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "hable con su administrador de sistemas"
        });
    }
};

const borrarMedico = async (req, res = response) => {
    const id = req.params.id;
    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            res.status(404).json({
                ok: false,
                msg: "no existe este medico"
            });
        }
        await Medico.findByIdAndRemove(id);
        res.json({
            ok: true,
            msg: "se borro el medico, se fue a otro hospital"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "hable con su administrador de sistemas"
        });
    }
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}

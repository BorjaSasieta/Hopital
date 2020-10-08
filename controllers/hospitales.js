const { response } = require("express");
const Hospital = require('../models/hospital');
const usuario = require("../models/usuario");

const getHospitales = async (req, res = response) => {
    const hospitales = await Hospital.find().populate('usuario', 'nombre imagen');
    return res.status(200).json({
        ok: true,
        hospitales
    });    
};

const crearHospital = async (req, res = response) => {
   
    const uid = req.uid;
    const hospital = new Hospital({usuario:uid, ...req.body});
    try{
        const hospitalDB = await hospital.save();
        return res.status(200).json({
            ok: true,
            hospital: hospitalDB
        });
    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "hable con el administrador"
        });
    }
};

const actualizarHospital = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            res.status(404).json({
                ok: false,
                msg: "no existe este hospital"
            });
        }
        const cambioHospital = {
            ...req.body,
            usuario: uid
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambioHospital, { new: true });
        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "hable con su administrador de sistemas"
        });
    }
};

const borrarHospital = async (req, res = response) => {
    const id = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            res.status(404).json({
                ok: false,
                msg: "no existe este hospital"
            });
        }
        await Hospital.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'se borro el hospital correctamente'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "hable con su administrador de sistemas"
        });
    }
};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}

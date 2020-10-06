const { response } = require("express");
const Hospital = require('../models/hospital');

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

const actualizarHospital = (req, res = response) => {
    
};

const borrarHospital = (req, res = response) => {
    
};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}

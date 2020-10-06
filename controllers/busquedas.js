const { response } = require("express");
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getTodo = async (req, res = response) => {
    const cerca = req.params.cerca;
    const regex = new RegExp(cerca, 'i');
    const coses = await Promise.all([
        Usuario.find({ nombre: regex }, 'nombre imagen'),
        Hospital.find({ nombre: regex }, 'nombre imagen'),
        Medico.find({ nombre: regex }, 'nombre imagen')
    ]);
    res.json({
        ok: true,
        coses
    });
};

const getCollection = async (req, res = response) => {
    const taula = req.params.table;
    const cerca = req.params.cerca;
    const regex = new RegExp(cerca, 'i');
    let data = [];
    switch (taula) {
        case "medicos":
            data = await Medico.find({ nombre: regex }, 'nombre imagen').populate('usuario', 'nombre imagen').populate('hospital', 'nombre imagen');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex }, 'nombre imagen');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex }, 'nombre imagen').populate('usuario', 'nombre imagen');
            break;
        default:
            res.status(400).json({
                ok: false,
                msg: 'la tabla tiene de ser hospitales, medicos o usuarios'
            });
    }
    res.json({
        ok: true,
        data
    });
};

module.exports = {
    getTodo, 
    getCollection
}

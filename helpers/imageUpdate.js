const Usuario = require('../models/usuario');
const fs = require('fs');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const validarCampos = require('../middlewares/validar-campos');

const actualizarImg = async (tipo, id, nombre) => {
    let ret = true;
    switch (tipo) {
        case "medicos":
            const medico = await Medico.findById(id);
            ret = validar(medico, 'medicos', nombre);
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            ret = validar(usuario, 'usuarios', nombre);
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            ret = validar(hospital, 'hospitales', nombre);
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'el tipo tiene de ser hospitales, medicos o usuarios'
            });
    }
    return ret;
}

const validar = (data, path, nombre) => {
    let ret = true;
    if (!data) {
        ret = false;
    } else {
        const pathViejo = `./uploads/${path}/${data.imagen}`;
        if (fs.existsSync(pathViejo)) {
            fs.unlinkSync(pathViejo);
        }
        data.imagen = nombre;
        data.save();
    }
    return ret;
}

module.exports = {
    actualizarImg
}
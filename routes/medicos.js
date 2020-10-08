const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getMedicos);
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'tiene que ser un objeto id valido de mongodb').isMongoId(),
    validarCampos
],crearMedico);
router.put('/:id',[
    validarJWT,
    check('nombre', 'el nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'tiene que ser un objeto id valido de mongodb').isMongoId(),
    validarCampos
], actualizarMedico);
router.delete('/:id', validarJWT, borrarMedico);

module.exports = router;
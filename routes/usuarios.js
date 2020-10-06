const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actulizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post('/', [
check('nombre', 'el nombre es obligatorios').not().isEmpty(),
check('password', 'el password es obligatorio').not().isEmpty(),
check('email', 'el mail es obligatorio').isEmail(),
validarCampos
],crearUsuario);
router.put('/:id',[
    validarJWT,
    check('nombre', 'el nombre es obligatorios').not().isEmpty(),
    check('rol', 'el rol es obligatorio').not().isEmpty(),
    check('email', 'el mail es obligatorio').isEmail(),
    validarCampos
    ], actulizarUsuario);

router.delete('/:id', validarJWT, borrarUsuario);

module.exports = router;

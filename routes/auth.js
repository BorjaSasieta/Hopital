const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, reNewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const enrutador = Router();

enrutador.post('/', [
    check('email', 'el mail es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos
], login);

enrutador.post('/google', [
    check('token', 'el token de google es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn);

enrutador.get('/renew', [
    validarJWT
], reNewToken);

module.exports = enrutador;

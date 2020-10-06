const { Router } = require('express');
const { getTodo, getCollection } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const enrutador = Router();

enrutador.get('/:cerca', validarJWT, getTodo);
enrutador.get('/collection/:table/:cerca', validarJWT, getCollection);

module.exports = enrutador;

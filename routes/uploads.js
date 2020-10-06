const { Router } = require('express');
const { uploadFile, getFile } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');
const fileUpload = require('express-fileupload');

const enrutador = Router();
enrutador.use(fileUpload());

enrutador.put('/:tipus/:id', validarJWT, uploadFile);
enrutador.get('/:tipus/:img', validarJWT, getFile);

module.exports = enrutador;

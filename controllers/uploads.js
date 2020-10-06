const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImg } = require("../helpers/imageUpdate");
const path = require('path');
const fs = require('fs');

const uploadFile = (req, res = response) => {
    const tipo = req.params.tipus;
    const id = req.params.id;
    const tipusPermesos = ['usuarios','hospitales','medicos'];
    if(!tipusPermesos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'el tipus no esta permès'
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hi ha cap arxiu'
        });
    }
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length -1];
    const extensionsValides = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionsValides.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'extensió no permesa'
        });
    }
    const nomArxiu = `${ uuidv4() }.${extension}`;
    const pathArxiu = `./uploads/${tipo}/${nomArxiu}`;
    file.mv( pathArxiu, (error) => {
        if(error){
            return res.status(500).json({
                ok: false,
                msg: 'no es pot moure la imatge'
            });
        }
        actualizarImg(tipo, id, nomArxiu);
        res.json({
            ok: true,
            msg: "s'ha pujat l'arxiu",
            nomArxiu
        });
    });
}

const getFile = (req, res = response) => {
    const tipo = req.params.tipus;
    const img = req.params.img;
    let pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`);
    if (!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, '../uploads/no-img.png');
    }
    res.sendFile(pathImg);
}

module.exports = {
    uploadFile,
    getFile
}

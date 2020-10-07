const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//servidor
const app = express();

//configuració de cors
app.use(cors());

app.use(express.json());

// base de dades
dbConnection();

//directori public
app.use(express.static('public'));

//Camins
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

app.get('/', (request, response) => {
    response.json({ ok: true,
                msg: "Hola Món"});
});

app.listen(process.env.PORT, () => {
    console.log('el servidor esta encés al port ' + process.env.PORT);
});

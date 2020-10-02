const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//servidor
const app = express();

//configuració de cors
app.use(cors());

// base de dades
dbConnection();

const port = 3001;

//Camins
app.get('/', (request, response) => {
    response.json({ ok: true,
                msg: "Hola Món"});
});

app.listen(process.env.PORT, () => {
    console.log('el servidor esta encés al port ' + process.env.PORT);
});

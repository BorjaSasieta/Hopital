const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.BD_CNN, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
        console.log("s'ha carregat la base de dades");
    } catch(error) {
        console.log(error);
        throw new Error("mira les traçes!");
    }
}

module.exports = {
    dbConnection
}

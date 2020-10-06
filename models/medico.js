const { Schema, model } = require('mongoose');

const medicoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    imagen: {
        type: String,
        require: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }
});

medicoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Medico', medicoSchema);

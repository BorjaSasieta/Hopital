const { Schema, model } = require('mongoose');

const hospitalSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    imagen: {
        type: String,
        require: false
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

hospitalSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Hospital', hospitalSchema);

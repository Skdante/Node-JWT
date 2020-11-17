const mongoose = require('mongoose');

const terrenoSchema = mongoose.Schema({
    vendedor: {
        type: String,
        required: true,
        min: 2,
        max: 250
    },
    comprador: {
        type: String,
        required: true,
        min: 6,
        max: 250
    },
    estatus: {
        type: Number,
        required: true
    },
    fechaCompra: {
        type: String,
        required: true,
        min: 1,
        max: 250
    },
    descripcion: {
        type: String,
        required: false
    },
    asientosmarcados: {
        type: String,
        required: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Terreno', terrenoSchema);
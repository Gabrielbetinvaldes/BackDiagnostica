const mongoose = require('../db/Basedatos')

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    nombre: String,
    correo: String,
    cedula: String,
    rol: String,
    password: String
})

const Usuario = mongoose.model('usuarios', usuarioSchema)

module.exports = Usuario
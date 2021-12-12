const mongoose = require('../db/Basedatos')

const Schema = mongoose.Schema

const examenSchema = new Schema({
    nombre: String,
    rangoMin: String,
    rangoMax: String
   

})

const Examenes = mongoose.model('examenes', examenSchema)

module.exports = Examenes







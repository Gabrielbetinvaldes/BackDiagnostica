const mongoose = require('../db/Basedatos')

const Schema = mongoose.Schema

const agendaSchema = new Schema({
    examen: String,
    dia: String,
    hora: String,
    paciente: String,
    nombre: String,
    estado: String,
    resultado: String,
    
})

const Agenda = mongoose.model('agenda', agendaSchema)

module.exports = Agenda
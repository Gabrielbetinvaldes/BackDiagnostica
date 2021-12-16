const express = require('express')
const rutas = express.Router()


const Examenes = require('../models/Examen')
const Agenda = require('../models/Agenda')


const obtener_examenes = async () => {
    const datos = await Examenes.find()
    return datos
}

const obtener_agenda = async () => {
    const datos = await Agenda.find()
    return datos
}

rutas.get('/Examenes', async (req, res) => {
    res.json( await obtener_examenes())
})

rutas.get('/Agendas', async (req, res) => {
    res.json( await obtener_agenda())
})



rutas.post('/crear_examen', async (req, res) => {

    let body = req.body
    let examen = new Examenes(body)

    await examen.save()

    res.json(examen)
})


rutas.get('/Examenes/:id_examen', async (req, res) => {

    const id_examen = req.params.id_examen

    const examenes = await Examenes.findById(id_examen)

    res.json(examenes)
})

rutas.get('/Agendas/:nombre_examen', async (req, res) => {

    const nombre_examen = req.params.nombre_examen
    

    const examenes = await Agenda.find( {examen: nombre_examen, estado:"Disponible"})

    res.json(examenes)
})

rutas.delete('/eliminar_examen/:id_examen', async (req, res) => {


    const id_examen = req.params.id_examen

    const examenes = await Examenes.findById(id_examen)    
    await examenes.deleteOne()

    res.json({
        mensaje: "Examen eliminado correctamente"
    })
})


rutas.delete('/eliminar_agenda/:id_agenda', async (req, res) => {


    const id_agenda = req.params.id_agenda

    const agendas = await Agenda.findById(id_agenda)    
    await agendas.deleteOne()

    res.json({
        mensaje: "Agendamiento eliminado correctamente"
    })
})

rutas.post('/crear_agenda', async (req, res) => {

    let body = req.body
    let agenda= new Agenda(body)

    await agenda.save()

    res.json(agenda)
})


module.exports = rutas
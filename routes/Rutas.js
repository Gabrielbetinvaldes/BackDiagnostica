const express = require('express')
const rutas = express.Router()

const Examenes = require('../models/Examen')
const Usuario = require('../models/Usuario')

const obtener_examenes = async () => {
    const datos = await Examenes.find()
    return datos
}

rutas.get('/Examenes', async (req, res) => {
    res.json( await obtener_examenes())
})


rutas.post('/crear_usuario', async (req, res) => {

    let body = req.body
    let usuario = new Usuario(body)

    await usuario.save()

    res.json(usuario)
})

rutas.post('/crear_examen', async (req, res) => {

    let body = req.body
    let examen = new Examenes(body)

    await examen.save()

    res.json(examen)
})

module.exports = rutas
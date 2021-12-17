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

rutas.get('/AgendaId/:id_agenda', async (req, res) => {

    const id_agenda = req.params.id_agenda

    const agendas = await Agenda.findById(id_agenda)

    res.json(agendas)
})

rutas.get('/Agendas/:nombre_examen', async (req, res) => {

    const nombre_examen = req.params.nombre_examen
    

    const examenes = await Agenda.find( {examen: nombre_examen})
    

    res.json(examenes)
})

rutas.get('/AgendasExterno/:nombre_examen', async (req, res) => {

    const nombre_examen = req.params.nombre_examen
    

    const examenes = await Agenda.find( {$and:[{examen: nombre_examen}, {estado:"Disponible"}]})
    

    res.json(examenes)
})


rutas.get('/AgendasExterno/:cedula', async (req, res) => {

    const cedula= req.params.cedula
    console.log(cedula);

    const paciente = await Agenda.find( {paciente: cedula})

    res.json(paciente)
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

rutas.put("/actualizar_examen/:id_examen", async (req, res) => {
    const id_examen = req.params.id_examen;
  
    const examen = await Examenes.findById(id_examen);
    examen._id = req.body._id
    examen.nombre = req.body.nombre
    examen.rangoMin = req.body.rangoMin
    examen.rangoMax = req.body.rangoMax
  
    await examen.save()
  
    res.json({
      mensaje: "Examen actualizado correctamente",
    });
  });


  rutas.put("/actualizar_agenda/:id_agenda", async (req, res) => {
    const id_agenda = req.params.id_agenda;
  
    const agenda = await Agenda.findById(id_agenda);
    agenda._id = req.body._id
    agenda.nombre = req.body.nombre
    agenda.dia = req.body.dia
    agenda.hora = req.body.hora
  
    await agenda.save()
    
  
    res.json({
      mensaje: "Agenda Actualizada correctamente",
    });
  });



  rutas.put("/seleccionar_agenda/:id_agenda", async (req, res) => {
    const id_agenda = req.params.id_agenda;
    
  
    const agenda = await Agenda.findById(id_agenda);
    agenda.estado = "No Disponible"
    
    console.log(id_agenda)
    
  
    await agenda.save()
    
  
    res.json({
      mensaje: "Agenda Seleccionada correctamente",
    });
  });

module.exports = rutas
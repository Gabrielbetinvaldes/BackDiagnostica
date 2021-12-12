const mongoose = require('mongoose')

const usuario = process.env.USUARIO_BD
const pass = process.env.PASS_BD
const nombre_bd = process.env.NOMBRE_BD

const uri_bd = `mongodb+srv://${usuario}:${pass}@servidor.acv45.mongodb.net/${nombre_bd}?retryWrites=true&w=majority`


mongoose.connect(uri_bd)
.then(() => console.log("Base de datos conectada"))
.catch((e) => console.log("Error: ", e))

module.exports = mongoose
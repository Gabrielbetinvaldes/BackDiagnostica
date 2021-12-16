const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');


require('dotenv').config()

const rutas_publicas = require("./routes/RutasPublicas")
const rutas = require('./routes/Rutas')

const app = express()
const puerto = process.env.PORT || 8080
const cors_config = {
    origin: '*'
}

var jsonParser = bodyParser.json()
 

app.use('/api', jsonParser, cors(cors_config), rutas_publicas)
app.use('/api', jsonParser, cors(cors_config),  rutas)


app.listen(puerto, () => {
    console.log("Servidor listo para su uso.");
})
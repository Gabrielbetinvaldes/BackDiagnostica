const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const rutas_publica = express.Router();

const Usuario = require("../models/Usuario");

rutas_publica.post("/login", async (req, res) => {
  let correo = req.body.correo;

  let usuario = await Usuario.findOne({ correo: correo });

  if (!usuario) {
    return res.json({
      mensaje: "el usuario no existe",
    });
  } else {
    let password = req.body.password;

    let validar_password = await bcrypt.compare(password, usuario.password);

    if (!validar_password) {
      return res.json({
        mensaje: "clave equivocada",
      });
    }
  }

  token_jwt = jwt.sign(
    {
      id: usuario._id,
      nombre: usuario.nombre,
    },
    process.env.SECRETO_JWT
  );

  res.json({
    mensaje: `Bienvenido ${usuario.nombre}`,
    token: token_jwt,
  });
});
  


rutas_publica.post("/crear_usuario", async (req, res) => {
  let body = req.body;

  let salto = await bcrypt.genSalt(10);

  let password = await bcrypt.hash(body.password, salto);

  let nuevo_usuario = {
    nombre: body.nombre,
    correo: body.correo,
    cedula: body.cedula,
    rol: body.rol,
    password: password,
  };

  let usuario = new Usuario(nuevo_usuario);

  await usuario.save();

  res.json(usuario);
});


module.exports = rutas_publica;

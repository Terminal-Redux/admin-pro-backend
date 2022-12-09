const bcrypt = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });

    // Verificar email
    if(!usuarioDB) {
        return res.status(404).json({
            ok: false,
            msg: 'Email no encontrado'
        });
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if(!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'Contraseña no válida'
        });
    }

    // Generar el TOKEN - JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};

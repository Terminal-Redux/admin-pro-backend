const bcrypt = require("bcryptjs");
const { response } = require("express");
const { googleVerify } = require("../helpers/google-verify");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });

    // Verificar email
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }

    // Generar el TOKEN - JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  try {
    console.log("1");
    const { email, name, picture } = await googleVerify(req.body.token);
    console.log("2");

    const usuarioDB = await Usuario.findOne({ email });

    console.log("3");
    let usuario;

    if (!usuarioDB) {
      console.log("4");
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      console.log("4");
      usuario = usuarioDB;
      usuario.google = true;
      // usuario.password = '@@';
    }

    // Guardar usuario

    console.log("5");
    await usuario.save();

    // Generar el TOKEN - JWT

    console.log("6");
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      email,
      name,
      picture,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Token de Google no es correcto",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};

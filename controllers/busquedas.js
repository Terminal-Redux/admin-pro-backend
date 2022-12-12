// getTodo()
const { response } = require("express");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");

const Usuario = require("../models/usuario");

const getTodo = async (req, res) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, hospitales, medicos] = await Promise.all([
    await Usuario.find({ nombre: regex }),
    await Hospital.find({ nombre: regex }),
    await Medico.find({ nombre: regex }),
  ]);

  try {
    res.json({
      ok: true,
      usuarios,
      hospitales,
      medicos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Pongase en contacto con el admin",
    });
  }
};

module.exports = {
  getTodo,
};

const getDocumentosColeccion = async (req, res) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let data = [];

  try {
    switch (tabla) {
      case "medicos":
        data = await Medico.find({ nombre: regex })
          .populate("usuario", "nombre img")
          .populate("hospital", "nombre img");
        break;
      case "hospitales":
        data = await Hospital.find({ nombre: regex }).populate(
          "usuario",
          "nombre img"
        );
        break;
      case "usuarios":
        data = await Usuario.find({ nombre: regex });
        break;
      default:
        return res.status(400).json({
          ok: false,
          msg: "La tabla tiene que ser usuarios/medicos/hospitales",
        });
    }

    res.json({
      ok: true,
      resultados: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Pongase en contacto con el admin",
    });
  }
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};

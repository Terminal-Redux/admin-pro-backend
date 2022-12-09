/*
    Hospitales
    Ruta: '/api/hospitales'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getUsuarios);

router.post("/", [], crearUsuario);

router.put("/:id", [], actualizarUsuario);

router.delete("/:id", validarJWT, borrarUsuario);

module.exports = router;

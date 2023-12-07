const { Router } = require("express");
const { cipherGet, cipherPost } = require("../controllers/cipher");
const { check } = require("express-validator");
const { existeCodeId } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//GET
router.get("/", cipherGet);

//POST
router.post(
  "/:id/:key",
  [
    check("key", "No es un id de Mongo válido").isMongoId(),
    check("key").custom(existeCodeId),
    validarCampos,
  ],
  cipherPost
);

module.exports = router;

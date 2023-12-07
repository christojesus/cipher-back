const Code = require("../models/code");

const existeCodeId = async (id) => {
  const existeCode = await Code.findById(id);
  if (!existeCode) {
    throw new Error(`El id: ${id}, no existe`);
  }
};

module.exports = {
  existeCodeId,
};

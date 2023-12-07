const { Schema, model } = require("mongoose");

const CodeSchema = Schema({
  status: { type: Boolean },
});

CodeSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Code", CodeSchema);

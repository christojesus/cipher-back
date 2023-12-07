const { request, response } = require("express");
const { Web3 } = require("web3");

const choiceContract = require("../assets/ChoiceContract.json");
const Code = require("../models/code");
const web3 = new Web3(process.env.GANACHE_NET);

//Config
const init = async () => {
  const netId = await web3.eth.net.getId();
  const deployNet = choiceContract.networks[netId];
  const contract = new web3.eth.Contract(choiceContract.abi, deployNet.address);
  return contract;
};

//GET
const cipherGet = async (req = request, res = response) => {
  const contract = await init();
  const voteCountOption1 = await contract.methods.getVoteCount(1).call();
  const voteCountOption2 = await contract.methods.getVoteCount(2).call();
  const voteCountOption3 = await contract.methods.getVoteCount(3).call();

  res.json({
    msg: "Three options vote count",
    voteCountOption1: Number(voteCountOption1),
    voteCountOption2: Number(voteCountOption2),
    voteCountOption3: Number(voteCountOption3),
  });
};

const validarCodigo = async (key) => {
  const code = await Code.findById(key);
  if (!code || code.status === false) {
    return false;
  }
  return true;
};

//POST
const cipherPost = async (req = request, res = response) => {
  const { id, key } = req.params;

  try {
    const codigoValido = await validarCodigo(key);

    if (!codigoValido) {
      return res.status(400).json({
        msg: "Código inválido o estado en false",
        optionId: id,
      });
    }

    if (id > 0 && id < 4) {
      const contract = await init();
      const addresses = await web3.eth.getAccounts();
      await contract.methods.vote(id).send({ from: addresses[0] });

      await Code.findByIdAndUpdate(key, { status: false });

      res.json({
        msg: "Vote OK",
        optionId: id,
      });
    } else {
      res.json({
        msg: "ERROR: Invalid option",
        optionId: id,
      });
    }
  } catch (error) {
    console.error("Error en cipherPost:", error);
    res.status(500).json({
      msg: "Error interno del servidor",
      optionId: id,
    });
  }
};

module.exports = {
  cipherGet,
  cipherPost,
};

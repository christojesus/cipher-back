const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

//Server class
class Server {
  //Constructor
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.cipherPath = "/api/cipher";

    //Conectar a la base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  //Método conectarDB
  async conectarDB() {
    await dbConnection();
  }

  //Middlewares
  middlewares() {
    //CORS
    this.app.use(cors());

    //Body read
    this.app.use(express.json());

    //Public
    this.app.use(express.static("public"));
  }

  //Routes
  routes() {
    this.app.use(this.cipherPath, require("../routes/cipher"));
  }

  //Listen
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;

const ganache = require("ganache");

class Network {
  constructor() {
    this.server = ganache.server();
    this.port = process.env.PORT_NET;
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Red corriendo en puerto", this.port);
    });
  }
}

module.exports = Network;

require("dotenv").config();
const Network = require("./models/network");

//Network
const network = new Network();
network.listen();

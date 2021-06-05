/* connects to db and sends back client */
require("dotenv").config();
const pg = require("pg");

const client = new pg.Client(process.env.DATABASE_URL);

client
  .connect()
  .then(() => console.log("Connected to database"))
  .catch(e => console.log(`Error connecting to ElephantSQL server:\n${e}`));

module.exports = client;


const router = require("express").Router();

module.exports = db => { 
  router.get("/type", (request, response) => {
    db.query(
      `
      SELECT *
      FROM type
      `
    ).then(({ rows: type }) => {
      response.json(type);
    }).catch(error => { error });
  });


  return router;
}
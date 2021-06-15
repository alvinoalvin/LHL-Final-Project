const router = require("express").Router();

module.exports = db => {
  router.get("/status", (request, response) => {
    db.query(
      `
      SELECT *
      FROM status
      ORDER BY id DESC
      `
    ).then(({ rows: status }) => {
      response.json(status);
    }).catch(error => { error });
  });
  return router;
}
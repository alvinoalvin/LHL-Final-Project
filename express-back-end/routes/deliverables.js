const router = require("express").Router();

module.exports = db => {
  router.get("/deliverables", (request, response) => {
    db.query(
      `
      SELECT *
      FROM deliverables
      `
    ).then(({ rows: deliverables }) => {
      response.json(deliverables);
    });
  });

  router.get("/tasks", (request, response) => {
    db.query(
      `
      SELECT *
      FROM deliverables
      JOIN type on type_id = type.id
      where type.type = 'Task'
      `
    ).then(({ rows: deliverables }) => {
      response.json(deliverables);
    });
  });
  return router;
}
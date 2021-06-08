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

  router.get("/tasks/", (request, response) => {
    db.query(
      `
      SELECT *, deliverables.id as id, (users.first_name ||' ' || users.last_name) as full_name
      FROM deliverables
      inner JOIN type on type_id = type.id
      inner JOIN status on status_id = status.id
      inner JOIN users on creator = users.id
      where type.type = 'Task'
      `
    ).then(({ rows: deliverables }) => {
      response.json(deliverables);
    });
  });

  router.get("/tasks/:id", (request, response) => {
    db.query(
      `
      SELECT *, deliverables.id as id, (users.first_name ||' ' || users.last_name) as full_name
      FROM deliverables
      inner JOIN type on type_id = type.id
      inner JOIN status on status_id = status.id
      inner JOIN users on creator = users.id
      where type.type = 'Task' and creator = $1
      `, [request.params.id]
    ).then(({ rows: deliverables }) => {
      response.json(deliverables);
    });
  });
  
  return router;
}
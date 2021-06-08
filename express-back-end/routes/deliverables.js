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
    const queryString = `
      SELECT *, deliverables.id as id, (users.first_name ||' ' || users.last_name) as full_name
      FROM deliverables
      inner JOIN type on type_id = type.id
      inner JOIN status on status_id = status.id
      inner JOIN users on creator = users.id
      where type.type = 'Task'
    `;

    db.query(queryString).then(({ rows: deliverables }) => {
      response.json(deliverables);
    });
  });

  router.get("/tasks/:task_id", (request, response) => {
    const queryString = `
      SELECT *, deliverables.id as id, (users.first_name ||' ' || users.last_name) as full_name,
        CASE
          When status.status = 'Completed'
            Then TRUE
          When not status.status = 'Completed'
            Then FALSE
        END is_completed
      FROM deliverables
      inner JOIN type on type_id = type.id
      inner JOIN status on status_id = status.id
      inner JOIN users on creator = users.id
      where type.type = 'Task' and creator = $1
      `;

    db.query(
      queryString, [request.params.task_id]
    ).then(({ rows: deliverables }) => {
      response.json(deliverables);
    });
  });

  router.delete("/deliverables/:id", (request, response) => {
    const queryString = `UPDATE deliverables SET delete=true WHERE id=$1`;

    db.query(queryString, request.params.id)
      .then((result) => {
        response.json({ msg: 'success' })
      })
      .catch((err) => {
        console.log(err.message)
      });
  });

  return router;
}
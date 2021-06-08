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
      `, [request.params.id]
    ).then(({ rows: deliverables }) => {
      response.json(deliverables);
    });
  });

  router.get("/deliverables/users/:user_id", (request, response) => {


    db.query(
      `
        SELECT *, deliverables.id as deliverable_id, users.id as user_id, teams.id as team_id, skills.name as skill_name, deliverables.name as deliverable_name
        FROM deliverables
        JOIN users ON assigned_to=users.id
        JOIN teams ON users.team_id = teams.id
        JOIN skills ON skill_id = skills.id
        JOIN type ON type_id = type.id
        JOIN status ON status_id = status.id
        WHERE users.id=${request.params.user_id}
        ORDER BY skill_id, status_id
      `
      )
        .then(({ rows: deliverables }) => {
          response.json(deliverables);
        });
  })

  return router;
}
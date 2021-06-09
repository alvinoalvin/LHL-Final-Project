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

  router.get("/deliverables/users/skills/:user_id&:skill_id", (request, response) => {


    db.query(
      `
      SELECT deliverables.name as deliverable_name, type.type, time_estimate_minutes, end_date, status.status
      FROM deliverables
      JOIN users ON assigned_to=users.id
      JOIN teams ON users.team_id = teams.id
      JOIN skills ON skill_id = skills.id
      JOIN type ON type_id = type.id
      JOIN status ON status_id = status.id
      WHERE users.id=${request.params.user_id}
      AND skills.id =${request.params.skill_id}
      ORDER BY type
      `
      )
        .then(({ rows: deliverables }) => {
          response.json(deliverables);
        });
  })

  return router;
}
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
      inner JOIN users on assigned_to = users.id
      where type.type = 'Task' and deleted = false
    `;

    db.query(queryString).then(({ rows: deliverables }) => {
      response.json(deliverables);
    });
  });

  router.post("/tasks", (request, response) => {
    const { creator, assigned_to, skill_id, status_id, time_estimate_minutes, type_id, name, notes, link, create_date } = request.body
    console.log("request.body: ", request.body);
    const values = [creator, assigned_to, skill_id, status_id, time_estimate_minutes, type_id, name, notes, link, create_date]
    console.log("values", values);

    const queryString = `INSERT INTO deliverables(creator, assigned_to, skill_id, status_id, time_estimate_minutes, type_id, name, notes, link, create_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, (to_timestamp($10)))`
    db.query(queryString, values)
      .then((result) => {
        response.json({ msg: 'success' })
      })
      .catch((err) => {
        console.log(err.message)
      });
  })

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
      inner JOIN users on assigned_to = users.id
      where type.type = 'Task' and assigned_to = $1 and deleted = false
      `;

    db.query(
      queryString, [request.params.task_id]
    ).then(({ rows: deliverables }) => {
      response.json(deliverables);
    });
  });

  router.get("/tasks/:task_id/:skill_id", (request, response) => {
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
      inner JOIN users on assigned_to = users.id
      where type.type = 'Task' and assigned_to = $1 and deleted = false and skill_id = $2
      `;

    db.query(
      queryString, [request.params.task_id, request.params.skill_id]
    ).then(({ rows: deliverables }) => {
      response.json(deliverables);
    });
  });

  router.delete("/deliverables/:id", (request, response) => {
    const queryString = `UPDATE deliverables SET deleted=true WHERE id=$1`;

    db.query(queryString, [request.params.id])
      .then((result) => {
        response.json({ msg: 'success' })
      })
      .catch((err) => {
        console.log(err.message)
      });
  });

  return router;
}
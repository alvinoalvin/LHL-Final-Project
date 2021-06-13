const router = require("express").Router();

module.exports = db => {
  router.get("/deliverables", (request, response) => {
    try {
      db.query(
        `
      SELECT *
      FROM deliverables
      ORDER BY id DESC
      `
      ).then(({ rows: deliverables }) => {
        response.json(deliverables);
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/tasks", (request, response) => {
    const queryString = `
      SELECT *, deliverables.id as id, (users.first_name ||' ' || users.last_name) as full_name
      FROM deliverables
      inner JOIN type on type_id = type.id
      inner JOIN status on status_id = status.id
      inner JOIN users on assigned_to = users.id
      where type.type = 'Task' and deleted = false
    `;
    try {
      db.query(queryString).then(({ rows: deliverables }) => {
        response.json(deliverables);
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/tasks", (request, response) => {
    const { creator, assigned_to, skill_id, status_id, time_estimate_minutes, type_id, name, notes, link, create_date } = request.body
    const values = [creator, assigned_to, skill_id, status_id, time_estimate_minutes, type_id, name, notes, link, create_date]

    const queryString = `INSERT INTO deliverables(creator, assigned_to, skill_id,
      status_id, time_estimate_minutes, type_id, name, notes, link, create_date,start_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10) RETURNING id`

    try {
      db.query(queryString, values)
        .then((result) => {
          response.json({ msg: 'success', result: result.rows[0] })
        })
        .catch((err) => {
          console.log(err.message)
        });
    } catch (err) {
      next(err);
    }
  })

  router.post("/tasks/:task_id", (request, response) => {
    const { name, status_id, link, end_date, time_estimate_minutes } = request.body.task
    const values = [request.params.task_id, name, status_id, link, end_date, time_estimate_minutes]
    const queryString =
      `
    update deliverables SET
    name = $2, status_id = $3, link = $4, end_date = $5, time_estimate_minutes = $6
    where id = $1
    RETURNING *
    `
    try {
      db.query(queryString, values)
        .then((result) => {
          response.json({ msg: 'success', result: result.rows[0] })
        })
        .catch((err) => {
          console.log(err.message)
        });
    } catch (err) {
      next(err);
    }
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
    try {
      db.query(
        queryString, [request.params.task_id]
      ).then(({ rows: deliverables }) => {
        response.json(deliverables);
      }).catch((err) => {
        console.log(err.message)
      });;
    } catch (err) {
      next(err);
    }
  });

  router.get("/tasks/:user_id/:skill_id", (request, response) => {
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
    try {
      db.query(
        queryString, [request.params.user_id, request.params.skill_id]
      ).then(({ rows: deliverables }) => {
        response.json(deliverables);
      }).catch((err) => {
        console.log(err.message)
      });;
    } catch (err) {
      next(err);
    }
  });

  router.get("/resources/:user_id/:skill_id", (request, response) => {
    const queryString = `
      SELECT *, deliverables.id as id, (users.first_name ||' ' || users.last_name) as full_name
      FROM deliverables
      inner JOIN type on type_id = type.id
      inner JOIN users on assigned_to = users.id
      where type.id = 2 and assigned_to = $1 and deleted = false and skill_id = $2
      `;
    try {
      db.query(
        queryString, [request.params.user_id, request.params.skill_id]
      ).then(({ rows: deliverables }) => {
        response.json(deliverables);
      }).catch((err) => {
        console.log(err.message)
      });;
    } catch (err) {
      next(err);
    }
  });

  router.delete("/deliverables", (request, response) => {
    const arr = JSON.parse(request.query.array);
    let paramStr = "(";
    for (let i = 1; i <= arr.length; i++) {
      if (i != arr.length) {
        paramStr += `$${i},`;
      } else {
        paramStr += `$${i}`;
      }
    }
    paramStr += ")";

    const queryString = `UPDATE deliverables SET deleted=true WHERE id IN ${paramStr} RETURNING *`;

    try {
      db.query(queryString, arr)
        .then((result) => {
          response.json({ msg: 'success' })
        })
        .catch((err) => {
          console.log(err.message)
        });
    } catch (err) {
      next(err);
    }
  });

  router.get("/deliverables/users/skills/:user_id&:skill_id", (request, response) => {
    db.query(
      `
      SELECT deliverables.id as deliverable_id, deliverables.name as deliverable_name, type.type, time_estimate_minutes, end_date, status.status
      FROM deliverables
      JOIN users ON assigned_to=users.id
      JOIN teams ON users.team_id = teams.id
      JOIN skills ON skill_id = skills.id
      JOIN type ON type_id = type.id
      JOIN status ON status_id = status.id
      WHERE users.id=${request.params.user_id}
      AND skills.id =${request.params.skill_id}
      AND type.id=1
      AND deleted=false
      ORDER BY type
      `
    )
      .then(({ rows: deliverables }) => {
        response.json(deliverables);
      }).catch((err) => {
        console.log(err.message)
      });;
  })

  router.post("/deliverables", (request, response) => {
    const { creator, assigned_to, skill_id, status_id, time_estimate_minutes, type_id, name, notes, link } = request.body

    const values = [creator, assigned_to, skill_id, status_id, time_estimate_minutes, type_id, name, notes, link]

    const queryString = `INSERT INTO deliverables(creator, assigned_to, skill_id, status_id, time_estimate_minutes, type_id, name, notes, link, create_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`
    try {
      db.query(queryString, values)
        .then(({ rows: deliverables }) => {
          response.json(deliverables);
        });
    } catch (err) {
      next(err);
    }
  })

  router.get("/deliverables/counts/:userID/:skillID", (request, response) => {
    const queryString = `
      select status, count(deliverables.id)
      from deliverables
      inner JOIN status on status_id = status.id
      inner JOIN users on assigned_to = users.id
      where type_id = 1 and assigned_to = $1 and deleted = false and skill_id = $2
      group by status
      `;
    try {
      db.query(queryString, [request.params.userID, request.params.skillID])
        .then(({ rows: deliverables }) => {
          response.json(deliverables);
        });
    } catch (err) {
      next(err);
    }
  })
  return router;
}
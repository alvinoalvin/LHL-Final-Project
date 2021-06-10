const router = require("express").Router();

module.exports = db => { 
  router.get("/skills", (request, response) => {
    db.query(
      `
      SELECT *
      FROM skills
      `
    ).then(({ rows: skills }) => {
      response.json(skills);
    });
  });

  router.get("/skills/users/:user_id", (request, response) => {
    db.query(
      `
      SELECT skills.id, skills.name
      FROM skills
      JOIN deliverables ON skill_id=skills.id
      JOIN users ON assigned_to=users.id
      WHERE users.id=${request.params.user_id}
      GROUP BY skills.id, skills.name
      `
    ).then(({ rows: skills }) => {
      response.json(skills);
    });
  });

  router.get("/skills/report/users/:user_id", (request, response) => {
    db.query(
      `
      SELECT skill_id, skills.name as skill_name,
      count(*) FILTER (WHERE type_id=1) AS task_count,
      count(*) FILTER (WHERE type_id=2) AS resource_count,
      SUM(time_estimate_minutes) as total_time
      FROM skills
      JOIN deliverables ON skill_id = skills.id
      JOIN users ON assigned_to = users.id
      WHERE users.id=${request.params.user_id}
      GROUP BY skill_id, skills.name
      `
    ).then(({ rows: skills }) => {
      response.json(skills);
    });
  });



  return router;
}
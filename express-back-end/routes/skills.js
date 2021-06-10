const { query } = require("express");

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
      SELECT * 
      FROM users_skills
      JOIN users ON users.id=user_id
      JOIN skills ON skills.id=skill_id
      WHERE users.id=${request.params.user_id}
      `
    ).then(({ rows: skills }) => {
      response.json(skills);
    });
  });

  router.post("/skills/users/:user_id", (request, response) => {
    const { skill_name } = request.body
    const queryString = `INSERT INTO skills(name) VALUES($1)`
    const values = [skill_name]

    db.query(queryString, values)
    .then(({ rows: skills }) => {
      const queryString = `SELECT * FROM skills WHERE name=$1`
      const values = [skill_name]

      db.query(queryString, values)
        .then(({ rows: skills }) => {
          skill_id = skills[0].id
          const values = [request.params.user_id, skill_id ]
          const queryString = `INSERT INTO users_skills(user_id, skill_id)
          VALUES ($1, $2)`

          db.query(queryString, values)
          .then(({ rows: skills }) => {
          });
        });
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
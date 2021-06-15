const router = require("express").Router();

module.exports = db => { 
  router.get("/csv/teams/:team_id", (request, response) => {
    db.query(
      `
      SELECT teams.name as team_name, users.first_name, users.last_name, users.email, users.position, skills.name as skill_name, type.type, 
      time_estimate_minutes, deliverables.name as deliverable_name, notes, link, create_date, start_date, end_date
      FROM deliverables
      JOIN users ON assigned_to=users.id
      JOIN teams ON users.team_id = teams.id
      JOIN skills ON skill_id = skills.id
      JOIN type ON type_id = type.id
      JOIN status ON status_id = status.id
      WHERE teams.id=${request.params.team_id}
      ORDER BY users.id, skills.name, type.type
      `
    ).then(({ rows: deliverables }) => {
      response.json(deliverables);
    }).catch(error => { error });
  });

  return router;
}
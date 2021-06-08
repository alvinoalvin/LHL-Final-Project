const router = require("express").Router();

module.exports = db => {
  router.get("/teams", (request, response) => {
    db.query(
      `
      SELECT *
      FROM teams
      `
    ).then(({ rows: teams }) => {
      response.json(teams);
    });
  });

  router.get("/teams/:team_id", (request, response) => {
    db.query(
      `
      SELECT users.id, first_name, last_name, email, position, delete, team_id
      FROM users
      JOIN teams on team_id=teams.id
      WHERE team_id = ${request.params.team_id}
      AND delete=false
      `
    ).then(({ rows: teams }) => {
      console.log("***GET METHOD***", response);
      response.json(teams);
    });
  });

  return router;
}
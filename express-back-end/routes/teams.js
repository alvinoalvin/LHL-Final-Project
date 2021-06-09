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
    // to do: sort and organize by team leads first? 
    db.query(
      `
      SELECT users.id, first_name, last_name, email, position, delete, team_id,      
      count(*) FILTER (WHERE status_id=1) AS staged_count,
      count(*) FILTER (WHERE status_id=2) AS in_progress_count,
      count(*) FILTER (WHERE status_id=3) AS completed_count
      FROM users
      JOIN teams on team_id=teams.id
      FULL JOIN deliverables on assigned_to=users.id
      WHERE team_id = ${request.params.team_id}
      AND delete=false
      GROUP BY users.id
      `
    ).then(({ rows: teams }) => {
      console.log("***GET METHOD***", response);
      response.json(teams);
    });
  });

  return router;
}
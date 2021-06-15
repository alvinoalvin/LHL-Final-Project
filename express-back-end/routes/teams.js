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
    }).catch(error => { error });
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
      response.json(teams);
    }).catch(error => { error });
  });

  router.post("/teams/:team_id", (request, response) => {
    const {first_name, last_name, email, position} = request.body
    const team_id = request.params.team_id;

    const values = [ first_name, last_name, email, position, team_id ]

    const queryString = `INSERT INTO users(first_name, last_name, email, position, team_id)
    VALUES ($1, $2, $3, $4, $5)`
    db.query(queryString, values)
    .then((result) => {
      response.json({msg: 'success'})
    })
    .catch((err) => {
      console.log(err.message)
    });
  })

  return router;

}
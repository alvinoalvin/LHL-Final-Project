const router = require("express").Router();

module.exports = db => {
  router.get("/notes/:user_id/:skill_id", (request, response) => {
    db.query(
      `
      SELECT *
      FROM notes
      WHERE user_id=${request.params.user_id} and skill_id = ${request.params.skill_id}
      `
    ).then(({ rows: notes }) => {
      response.json(notes);
    });
  });

  return router;
}
const router = require("express").Router();

module.exports = db => {
  router.get("/notes/:user_id/:skill_id", (request, response) => {
    try {
      db.query(
        `
      SELECT *
      FROM notes
      WHERE user_id=${request.params.user_id} and skill_id = ${request.params.skill_id}
      `
      ).then(({ rows: notes }) => {
        response.json(notes);
      }).catch(error => { error });
    } catch (err) {
      next(err);
    }
  });
  router.post("/notes", (request, response) => {
    try {
      db.query(
        `
      Insert into notes (user_id, skill_id, note) values ($1,$2,$3) Returning *
      `, [request.body.user_id, request.body.skill_id, request.body.note]
      ).then(({ rows: notes }) => {
        response.json(notes);
      }).catch(error => { error });
    } catch (err) {
      next(err);
    }
  });
  router.delete("/notes/:note_id", (request, response) => {
    try {
    db.query(
      `DELETE from notes where id = $1 Returning *`, [request.params.note_id]
    )
      .then((rows) => {
        response.json(rows);
      }).catch(
        error => {
          console.log(error)
        }
      );z
    } catch (err) {
      next(err);
    }
  });
  return router;
}
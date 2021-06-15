const { request, response } = require("express");

const router = require("express").Router();

module.exports = db => {
  router.get("/users", (request, response) => {
    db.query(
      `
      SELECT *
      FROM users
      WHERE delete=false
      `
    ).then(({ rows: users }) => {
      response.json(users);
    }).catch(error => { error });
  });

  router.get("/users/:user_id", (request, response) => {
    db.query(
      `
      SELECT *
      FROM users
      WHERE id = ${request.params.user_id}
      `
    ).then(({ rows: users }) => {
      response.json(users);
    }).catch(error => { error });
  });

  router.delete("/users/:user_id", (request, response) => {
    const values = [request.params.user_id]
    const queryString = `UPDATE users SET delete=true WHERE id=$1`

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
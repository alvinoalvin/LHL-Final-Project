const router = require("express").Router();

module.exports = (db) => {
  router.get("/analytics/skill-status", (request, response) => {
    db.query(
      `
      Select deliverables.assigned_to, deliverables.skill_id, skills.name, deliverables.status_id, status.status, Count(*)
      From deliverables
      INNER JOIN skills ON deliverables.skill_id=skills.id
      INNER JOIN status ON deliverables.status_id=status.id
      Where deliverables.assigned_to = 1
      Group By deliverables.assigned_to, deliverables.skill_id, skills.name, deliverables.status_id, status.status
      `
    ).then(({ rows: skills }) => {
      response.json(skills);
    });
  });

  router.get("/analytics/time-estimate", (request, response) => {
    db.query(
      `
      Select deliverables.skill_id, skills.name, deliverables.status_id, status.status, Sum(time_estimate_minutes) AS total_estimate
      From deliverables
      INNER JOIN skills ON deliverables.skill_id=skills.id
      INNER JOIN status ON deliverables.status_id=status.id
      Where deliverables.assigned_to = 1
      Group By deliverables.skill_id, skills.name, deliverables.status_id, status.status
      `
    ).then(({ rows: skills }) => {
      response.json(skills);
    });
  });

  router.get("/analytics/completion-rate", (request, response) => {
    db.query(
      `
      SELECT 
      end_date, COUNT(*)
      FROM
      deliverables
      WHERE
      assigned_to = 1 AND type_id = 1 AND status_id = 3 AND end_date IS NOT NULL
      GROUP BY
      end_date
      `
    ).then(({ rows: skills }) => {
      response.json(skills);
    });
  });

  return router;
};

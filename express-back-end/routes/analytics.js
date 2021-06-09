const router = require("express").Router();

module.exports = db => {
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

  return router;
}
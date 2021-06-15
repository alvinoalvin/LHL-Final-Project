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
    }).catch(error => { error });
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
    }).catch(error => { error });
  });

  router.get("/analytics/topskills", (request, response) => {
    console.log(request.query)
    try {
      db.query(
        `
      select skills.name, skills.id,
      count(*) filter(where status.id=1) as stage_count,
      count(*) filter(where status.id=2) as progress_count,
      count(*) filter(where status.id=3) as complete_count,
      Sum(time_estimate_minutes) filter(where status.id=1) as sum_stage_time,
      Sum(time_estimate_minutes) filter(where status.id=2) as sum_progress_time,
      Sum(time_estimate_minutes) filter(where status.id=3) as sum_complete_time
      from deliverables
      JOIN status on status_id = status.id
      JOIN users on assigned_to = users.id
      JOIN skills on skill_id = skills.id
      where type_id = 1 and assigned_to = $1 and deleted = false
      group by  skills.name, skills.id

      `, [request.query.id]
      ).then(({ rows: skills }) => {
        response.json(skills);
      }).catch(error => { error });
    } catch (err) {
      next(err);
    };
  });

  router.get("/analytics/topskills/timeest", (request, response) => {
    console.log(request.query)
    const arr = JSON.parse(request.query.array);
    let paramStr = "(";
    for (let i = 1; i <= arr.length; i++) {
      if (i != arr.length) {
        paramStr += `$${i},`;
      } else {
        paramStr += `$${i}`;
      }
    }
    paramStr += ")";
    try {
      db.query(
        `
      select skill_id, status, sum(time_estimate_minutes) as estimated_time
      from deliverables
      join status on status_id = status.id
      where skill_id in ${paramStr} group by status,skill_id
      order by estimated_time desc
      `, arr
      ).then(({ rows: skills }) => {
        response.json(skills);
      }).catch(error => { error });
    } catch (err) {
      next(err);
    };
  });

  return router;
};

INSERT INTO teams (name, description)
VALUES
  ('Engineering', 'does engineering stuff'),
  ('Marketing', 'does marketing stuff');

INSERT INTO users (first_name, last_name, email, password, position, team_id)
VALUES
  ('Donny', 'Li', 'donny@donny.com', 'password', 'Team Lead', 1),
  ('Zea', 'Lingard', 'zea@zea.com', 'password', 'Contributor', 1),
  ('Alvin', 'Ng', 'alvin@alvin.com', 'password', 'Contributor', 1),
  ('Harp', 'Sandhu', 'harp@harp.com', 'password', 'Team Lead', 2),
  ('Bradley', 'Fung', 'brad@brad.com', 'password', 'Contributor', 2),
  ('Andy', 'Lindsay', 'andy@andy.com', 'password', 'Contributor', 2);

INSERT INTO status (status)
VALUES
  ('Staged'),
  ('Started'),
  ('Completed');

INSERT INTO skills (name, is_hard_skill)
VALUES
  ('React', true), 
  ('JavaScript', true),
  ('Project Development', false),
  ('Product Management', false),
  ('Scheduling', true), 
  ('Estimating', true), 
  ('Storytelling', false),
  ('Social Media Management', false),
  ('Risk Management', false),
  ('Negotiating', false),
  ('Testing', true),
  ('Conflict Resolution', false),
  ('Interviewing', false);

INSERT INTO type (type)
VALUES
  ('Task'),
  ('Resource');

INSERT INTO deliverables (creator, assigned_to, skill_id, status_id, time_estimate_minutes, type_id, name, notes, link, start_date, end_date)
VALUES
-- fake 'javascript' data
-- staged tasks and resources
  (2, 1, 1, 2, 160, 1, 'Complete Udemy Javascript Introductin Course', 'please complete the first chapter', 'https://www.udemy.com/course/javascript-basics-for-beginners/', '2021-05-25', '2021-06-11'),
  (3, 1, 1, 2, 30, 2, 'How it feels to learn JavaScript in 2016', 'Read for yourself', 'https://medium.com/hackernoon/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f', '2021-06-01', '2021-06-15'),
-- resources
  (2, 1, 11, 1, 45, 2, '10 Interview Questions Every JavaScript Developer Should Know', 'Read for yourself', 'https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95', '2021-06-02', '2021-06-12'), 
  (1, 1, 2, 1, 120, 1, 'Complete Advaned Codecademy Javascript Course', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript', '2021-06-09', '2021-06-15'),
  -- todo's
  (1, 1, 2, 2, 60, 1, 'Codecademy JavaScript Introduction Course Chapter 1', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript', '2021-06-09', '2021-06-11'),
  (1, 1, 2, 2, 70, 1, 'Codecademy JavaScript Introduction Course Chapter 2', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript', '2021-06-12', '2021-06-15'),
  (1, 1, 2, 2, 80, 1, 'Codecademy JavaScript Introduction Course Chapter 3', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript', '2021-06-15', '2021-06-20'),
  (1, 1, 2, 2, 80, 1, 'Codecademy JavaScript Introduction Course Chapter 4', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript','2021-06-15', '2021-06-20');

INSERT INTO tags (tag)
VALUES
  ('#javascript'),
  ('#webdevelopment'),
  ('#react'),
  ('#reactjs'),
  ('#projectmanagement'),
  ('#sales'),
  ('#programming'),
  ('#learningforlife'),
  ('#interview'),
  ('#jobhunt');

INSERT INTO skills_tags (deliverable_id, tag_id)
VALUES
  (1, 1);
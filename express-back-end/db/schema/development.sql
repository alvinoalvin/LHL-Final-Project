INSERT INTO teams (name, description)
VALUES
  ('Engineering', 'does engineering stuff'),
  ('Marketing', 'does marketing stuff');

INSERT INTO users (first_name, last_name, email, password, position, team_id)
VALUES
  ('Donny', 'Li', 'donny@gmail.com', 'password', 'Team Lead', 1),
  ('Zea', 'Lingard', 'zea@gmail.com', 'password', 'Contributor', 1),
  ('Alvin', 'Ng', 'alvin@gmail.com', 'password', 'Contributor', 1),
  ('Harp', 'Sandhu', 'harp@gmail.com', 'password', 'Contributor', 1),
  ('Bradley', 'Fung', 'brad@gmail.com', 'password', 'Contributor', 1),
  ('Andy', 'Lindsay', 'andy@gmail.com', 'password', 'Contributor', 1);

INSERT INTO status (status)
VALUES
  ('Staged'),
  ('In Progress'), 
  ('Completed');

INSERT INTO skills (name, is_hard_skill)
VALUES
  ('JavaScript', true), 
  ('React', true),
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
INSERT INTO deliverables (creator, assigned_to, skill_id, status_id, time_estimate_minutes, type_id, name, notes, link, create_date, start_date, end_date)
VALUES
-- fake 'javascript' data
-- resources
-- staged
  (2, 1, 1, 1, 30, 2, 'How it feels to learn JavaScript in 2016', 'Read for yourself', 'https://medium.com/hackernoon/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f', '2021-06-01','2021-06-01', '2021-06-15'),
  (3, 1, 1, 1, 85, 2, 'Eloquent JavaScript', 'Please read chapters 1 to 7', 'https://www.amazon.ca/Eloquent-JavaScript-3rd-Introduction-Programming-ebook/dp/B07C96Q217/ref=sr_1_10?crid=OSST1ZLWS62X&dchild=1&keywords=javascript&qid=1622926484&sprefix=javascript%2Caps%2C220&sr=8-10', '2021-06-01','2021-06-01', '2021-06-15'),
  (4, 1, 1, 1, 15, 2, 'JavaScript: What the heck is a Callback?', 'Please read in detail', 'https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced', '2021-06-01','2021-06-01', '2021-06-15'),
-- incomplete
  (1, 1, 1, 2, 45, 2, '10 Interview Questions Every JavaScript Developer Should Know', 'Read for yourself', 'https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95', '2021-06-02', '2021-06-02', '2021-06-21'), 
  (2, 1, 1, 2, 45, 2, 'Modern JavaScript Explained For Dinosaurs', 'Read for yourself', 'https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70', '2021-06-02','2021-06-02', '2021-06-20'), 
-- completed
  (1, 1, 1, 3, 15, 2, 'Top JavaScript Libraries & Tech to Learn in 2018', 'Read for yourself', 'https://medium.com/javascript-scene/top-javascript-libraries-tech-to-learn-in-2018-c38028e028e6', '2021-02-02', '2021-02-02', '2021-02-12'), 
  (4, 1, 1, 3, 15, 2, 'A Study Plan To Cure JavaScript Fatigue', 'Read for yourself', 'https://medium.com/free-code-camp/a-study-plan-to-cure-javascript-fatigue-8ad3a54f2eb1', '2021-03-02', '2021-03-02', '2021-04-12'), 
  (4, 1, 1, 3, 15, 2, 'The Cost Of JavaScript In 2018', 'Read for yourself', 'https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4', '2021-04-02', '2021-04-02', '2021-04-11'), 
  (1, 1, 1, 3, 15, 2, '13 Noteworthy Points from Google’s JavaScript Style Guide', 'Read for yourself', 'https://medium.com/free-code-camp/google-publishes-a-javascript-style-guide-here-are-some-key-lessons-1810b8ad050b', '2021-05-02', '2021-05-02', '2021-05-11'), 
-- tasks
-- staged
  (2, 1, 1, 1, 160, 1, 'Complete Udemy Javascript Introduction Course', 'please complete the first chapter', 'https://www.udemy.com/course/javascript-basics-for-beginners/', '2021-05-25', '2021-05-25', '2021-06-11'),
  (3, 1, 1, 1, 45, 1, 'LHL Exercise: CRUD w/ Express', 'Please read and complete', 'https://web.compass.lighthouselabs.ca/days/w03d2', '2021-06-01', '2021-06-01', '2021-06-15'),
-- incomplete
  (1, 1, 1, 2, 60, 1, 'Codecademy JavaScript Course Chapter 1', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript', '2021-06-09', '2021-06-09', '2021-06-11'),
  (1, 1, 1, 2, 70, 1, 'Codecademy JavaScript Introduction Course Chapter 2', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript', '2021-06-12', '2021-06-12', '2021-06-15'),
  (1, 1, 1, 2, 80, 1, 'Codecademy JavaScript Course Chapter 3', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript', '2021-06-15', '2021-06-15', '2021-06-20'),
  (1, 1, 1, 2, 80, 1, 'Codecademy JavaScript Course Chapter 4', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript','2021-06-15', '2021-06-15', '2021-06-20'),
-- completed
  (1, 1, 1, 3, 20, 1, 'Make helloWorld.js', 'console.log "hello world"', 'No Link Needed?', '2021-02-15', '2021-02-15', '2021-02-20'),
  (1, 1, 1, 3, 45, 1, 'Create Test Express Server', 'create a server with express on local host', 'No Link Needed?', '2021-03-15', '2021-03-15', '2021-03-20'),
  (2, 1, 1, 3, 75, 1, 'LHL Functions exercise', 'great exercises to cement understanding of functions', 'No Link Needed?', '2021-04-15','2021-04-15', '2021-04-20'),
-- fake 'react' data
-- resources
-- staged
  (3, 1, 2, 1, 5, 2, 'The most important lessons I’ve learned after a year of working with React', 'concise short read', 'https://medium.com/free-code-camp/mindset-lessons-from-a-year-with-react-1de862421981','2021-06-25', '2021-06-25', '2021-07-03'),
-- tasks
-- staged
  (2, 1, 2, 1, 85, 1, 'Create a react app', 'use create-react-app', 'https://reactjs.org/docs/getting-started.html', '2021-06-15', '2021-06-15', '2021-07-20'),
-- fake 'project development' data
-- resources
-- staged
  (4, 1, 2, 1, 15, 2, 'Let’s talk about Product Management', 'great read', 'https://news.greylock.com/let-s-talk-about-product-management-d7bc5606e0c4', '2021-07-15', '2021-07-15', '2021-07-16'),
-- tasks
-- staged
  (4, 1, 2, 1, 85, 1, 'Agile Crash Course', 'highly recommended by managers', 'https://www.udemy.com/course/agile-crash-course/','2021-06-28',  '2021-06-28', '2021-07-18'),

-- same fake data, but under a different user
-- fake 'javascript' data
-- resources
-- staged
  (2, 2, 1, 1, 30, 2, 'How it feels to learn JavaScript in 2016', 'Read for yourself', 'https://medium.com/hackernoon/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f', '2021-06-01','2021-06-01', '2021-06-15'),
  (4, 2, 1, 1, 15, 2, 'JavaScript: What the heck is a Callback?', 'Please read in detail', 'https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced', '2021-06-01','2021-06-01', '2021-06-15'),
-- incomplete
  (1, 2, 1, 2, 45, 2, '10 Interview Questions Every JavaScript Developer Should Know', 'Read for yourself', 'https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95', '2021-06-02', '2021-06-02', '2021-06-21'), 
-- completed
  (1, 2, 1, 3, 15, 2, 'Top JavaScript Libraries & Tech to Learn in 2018', 'Read for yourself', 'https://medium.com/javascript-scene/top-javascript-libraries-tech-to-learn-in-2018-c38028e028e6', '2021-02-02', '2021-02-02', '2021-02-12'), 
  (4, 2, 1, 3, 15, 2, 'A Study Plan To Cure JavaScript Fatigue', 'Read for yourself', 'https://medium.com/free-code-camp/a-study-plan-to-cure-javascript-fatigue-8ad3a54f2eb1', '2021-03-02', '2021-03-02', '2021-04-12'), 
  (1, 2, 1, 3, 15, 2, '13 Noteworthy Points from Google’s JavaScript Style Guide', 'Read for yourself', 'https://medium.com/free-code-camp/google-publishes-a-javascript-style-guide-here-are-some-key-lessons-1810b8ad050b', '2021-05-02', '2021-05-02', '2021-05-11'), 
-- tasks
-- staged
  (2, 2, 1, 1, 160, 1, 'Complete Udemy Javascript Introduction Course', 'please complete the first chapter', 'https://www.udemy.com/course/javascript-basics-for-beginners/', '2021-05-25', '2021-05-25', '2021-06-11'),
  (3, 2, 1, 1, 45, 1, 'LHL Exercise: CRUD w/ Express', 'Please read and complete', 'https://web.compass.lighthouselabs.ca/days/w03d2', '2021-06-01', '2021-06-01', '2021-06-15'),
-- incomplete
  (1, 2, 1, 2, 60, 1, 'Codecademy JavaScript Course Chapter 1', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript', '2021-06-09', '2021-06-09', '2021-06-11'),
  (1, 2, 1, 2, 70, 1, 'Codecademy JavaScript Introduction Course Chapter 2', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript', '2021-06-12', '2021-06-12', '2021-06-15'),
  (1, 2, 1, 2, 80, 1, 'Codecademy JavaScript Course Chapter 3', 'please complete the second chapter', 'https://www.codecademy.com/learn/introduction-to-javascript', '2021-06-15', '2021-06-15', '2021-06-20'),
-- completed
  (1, 2, 1, 3, 20, 1, 'Make helloWorld.js', 'console.log "hello world"', 'No Link Needed?', '2021-02-15', '2021-02-15', '2021-02-20'),
  (1, 2, 1, 3, 45, 1, 'Create Test Express Server', 'create a server with express on local host', 'No Link Needed?', '2021-03-15', '2021-03-15', '2021-03-20'),
  (2, 2, 1, 3, 75, 1, 'LHL Functions exercise', 'great exercises to cement understanding of functions', 'No Link Needed?', '2021-04-15','2021-04-15', '2021-04-20'),
-- fake 'react' data
-- resources
-- staged
  (3, 2, 2, 1, 5, 2, 'The most important lessons I’ve learned after a year of working with React', 'concise short read', 'https://medium.com/free-code-camp/mindset-lessons-from-a-year-with-react-1de862421981','2021-06-25', '2021-06-25', '2021-07-03'),
-- tasks
-- staged
  (2, 2, 2, 1, 85, 1, 'Create a react app', 'use create-react-app', 'https://reactjs.org/docs/getting-started.html', '2021-06-15', '2021-06-15', '2021-07-20'),
-- fake 'project development' data
-- resources
-- staged
  (4, 2, 2, 1, 15, 2, 'Let’s talk about Product Management', 'great read', 'https://news.greylock.com/let-s-talk-about-product-management-d7bc5606e0c4', '2021-07-15', '2021-07-15', '2021-07-16'),
-- tasks
-- staged
  (4, 2, 2, 1, 85, 1, 'Agile Crash Course', 'highly recommended by managers', 'https://www.udemy.com/course/agile-crash-course/','2021-06-28',  '2021-06-28', '2021-07-18');

INSERT INTO tags (tag)
VALUES
  ('#javascript'),
  ('#webdevelopment'),
  ('#codecademy'),
  ('#agile'),
  ('#productmanagement'),
  ('#programming');


INSERT INTO skills_tags (deliverable_id, tag_id)
VALUES
  (12, 1),
  (12, 2),
  (12, 3),
  (12, 6),
  (13, 1),
  (13, 2),
  (13, 3),
  (13, 6),
  (14, 1),
  (14, 2),
  (14, 3),
  (14, 6),
  (15, 1),
  (15, 2),
  (15, 3),
  (15, 6),
  (16, 1),
  (16, 2),
  (16, 6),
  (17, 1),
  (17, 2),
  (17, 6),
  (18, 1),
  (18, 2),
  (18, 5),
  (18, 6);

INSERT INTO notes (note, skill_id, user_id)
VALUES
  ('I love javascript', 1, 1),
  ('I hate javascript', 1, 1),
  ('JavaScript is life', 1, 1);

INSERT INTO users_skills(user_id, skill_id)
VALUES
  (1,1),
  (1,2),
  (2,1),
  (2,2);
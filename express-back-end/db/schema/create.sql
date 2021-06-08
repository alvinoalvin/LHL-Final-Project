DROP TABLE IF EXISTS teams CASCADE;

CREATE TABLE teams (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  position VARCHAR (255) NOT NULL,
  team_id INTEGER REFERENCES teams(id),
  delete BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS status CASCADE;

CREATE TABLE status (
  id SERIAL PRIMARY KEY NOT NULL,
  status VARCHAR(255) DEFAULT 'Staged'
);

DROP TABLE IF EXISTS skills CASCADE;

CREATE TABLE skills (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  is_hard_skill BOOLEAN
);


DROP TABLE IF EXISTS type CASCADE;

CREATE TABLE type (
  id SERIAL PRIMARY KEY NOT NULL,
  type VARCHAR(255) 
);

/* Deliverables will have either a task or resource type, seperated in the front end*/
DROP TABLE IF EXISTS deliverables CASCADE;

CREATE TABLE deliverables (
  id SERIAL PRIMARY KEY NOT NULL,
  creator INTEGER REFERENCES users(id) ON DELETE CASCADE,
  assigned_to INTEGER REFERENCES users(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
  status_id INTEGER REFERENCES status(id) ON DELETE CASCADE,
  time_estimate_minutes INT,
  type_id INTEGER REFERENCES type(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  notes TEXT,
  link VARCHAR(255),
  create_date DATE,
  start_date DATE,
  end_date DATE
);

DROP TABLE IF EXISTS tags CASCADE;

CREATE TABLE tags (
  id SERIAL PRIMARY KEY NOT NULL,
  tag VARCHAR(255)
);

DROP TABLE IF EXISTS skills_tags CASCADE;

CREATE TABLE skills_tags (
  id SERIAL PRIMARY KEY NOT NULL,
  deliverable_id INTEGER REFERENCES deliverables(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS notes CASCADE;

CREATE TABLE notes (
  id SERIAL PRIMARY KEY NOT NULL,
  note TEXT,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
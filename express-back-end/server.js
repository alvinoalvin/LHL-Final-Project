const cors = require('cors');
const Express = require('express');
const App = Express();
App.use(cors());
App.options('*', cors());
const BodyParser = require('body-parser');
const PORT = 8080;
const db = require("./db");

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

const users = require("./routes/users");
App.use("/api", users(db));
const deliverables = require("./routes/deliverables");
App.use("/api", deliverables(db));
const teams = require("./routes/teams");
App.use("/api", teams(db));
const analytics = require("./routes/analytics");
App.use("/api", analytics(db));
const skills = require("./routes/skills");
App.use("/api", skills(db));
const csv = require("./routes/csv");
App.use("/api", csv(db));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

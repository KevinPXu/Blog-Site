const path = require("path");
const express = require("express");
const helpers = require("./utils/helpers");

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();

const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Shhhhhhhhhh",
  resave: false,
  cookie: {
    maxAge: 300000,
  },
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

// add local modules 
const routes = require('./controllers');
const helpers = require('./utils/helpers');
// add the third party modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
// gcreate a new sequalize store using the express-session package
const sequalizeStore = require('connect-session-sequelize')(session.Store);
// initialize an instance of express.js  so that the server will run
const app = express();
// this is where i will specify which port the espress.js serever will run
const PORT = process.env.PORT || 3001;
// set up handlebars.js as the default engine with custom helpers
const hbs = exphbs.create({ helpers });
// set up session and connect to your sequelise db
// conFigure and link a session object with the sequelize store
const sess = {
    secret: 'Is in the sauce',
    cookie: {
      maxAge: 300000,
      // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
      httpOnly: true,
      // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
      secure: false,
      // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    // Sets up session store
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

// add express-session and store as express.js middleware
app.use(session(sess));
// inform express.js on which template engine to use 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// middleware for parsin JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static middleware pointing to the public folder
app.use(express.static(path.join(__dirname, 'public')));
// servers for the routes to the server
app.use(routes);
// start the server to begin listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
      console.log(`Now listening on http://localhost:${PORT}`)
    );
  });
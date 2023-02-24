const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');

app.set('view engine', 'hbs');

app.engine('hbs', engine({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: `${__dirname}/views/partials`
}));

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
};
  

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('main', {layout: 'index'});
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () =>
    console.log(
    `\nServer running on port ${PORT}. Visit http://localhost:${PORT}!`
    )
);
});

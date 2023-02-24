const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./controllers');
  

app.set('view engine', 'hbs');

app.engine('hbs', engine({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: `${__dirname}/views/partials`
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('main', {layout: 'index'});
});

app.use(routes);

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}/`);
})

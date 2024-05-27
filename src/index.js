const express = require('express');
const routes = require('./routes');
const path = require('path')
require('express-async-errors');
require("dotenv").config()


const app = express();

app.use((req, res, next) => {
  // Suponha que você tenha lógica para definir um alerta
  // Definimos como null ou uma string vazia quando não há alerta
  res.locals.alert = null; // ou res.locals.alert = '';
  next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(routes),
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static('src/public'));


//error handler (no async methods)
app.use((err, request, response, next) => {
  console.log('####  Error handler received ############################')
  console.log(err)
  response.sendStatus(500)
})

app.listen(process.env.PORT, () => { console.log(`🔥 Server running at http://localhost:${process.env.PORT}`); });
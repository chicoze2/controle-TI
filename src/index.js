const express = require('express');
const routes = require('./routes');
const path = require('path')
require('express-async-errors');

const app = express();

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

app.listen(3000, () => { console.log('🔥 Server running'); });
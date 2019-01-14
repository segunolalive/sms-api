var express = require('express');
var logger = require('morgan');

var routes = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/v1', routes);

app.use((req, res, next) => {
  res.status(404).send({ error: 'Not Found' })
})

app.use((err, req, res, next) => {
  const { message, name } = err;
  res.send({ error: { message, name } });
});

module.exports = app;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');

require('./helpers/db')();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => res.send('App running successfully.'));

app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

app.use((err, req, res, next) => {
  console.error(err);
  err.status = err.status || 500;

  // hide internal server error logs in production mode
  if (process.env.NODE_ENV === 'production' && err.status === 500) {
    err.message = 'Internal Server Error';
  }

  res.status(err.status).json({
    status: 'error',
    message: err.message,
  });
});

const serverPort = process.env.PORT || 3000;
app.listen(serverPort, () =>
  console.log(`Server listening on port ${serverPort}`),
);

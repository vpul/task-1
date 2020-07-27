require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const connectToDB = require('./helpers/db');

const auth = require('./routes/auth');
const user = require('./routes/user');

connectToDB();
const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API running successfully.'));
app.use('/api/auth', auth);
app.use('/api/user', user);

app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

// error handler
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

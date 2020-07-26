require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => res.send('App running successfully.'));

app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    status: 'error',
    message:
      // hide internal error logs in production mode
      process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err.message,
  });
});

const serverPort = process.env.PORT || 3000;
app.listen(serverPort, () =>
  console.log(`Server listening on port ${serverPort}`),
);

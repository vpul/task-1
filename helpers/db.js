const mongoose = require('mongoose');

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
};

const connectWithRetry = () => {
  mongoose
    .connect(process.env.DB_URL, options)
    .then(() => {
      console.log('Connected to the MongoDB successfully.');
    })
    .catch((err) => {
      console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
      setTimeout(connectWithRetry, 5000);
    });
};

module.exports = connectWithRetry;

const login = (req, res, next) => {
  res.status(200).json({
    hello: 'world',
  });
};

module.exports = login;

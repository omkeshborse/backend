const errorMiddleWare = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  console.log(err);
  res.json({ message: err.message });
};

module.exports = { errorMiddleWare };
  
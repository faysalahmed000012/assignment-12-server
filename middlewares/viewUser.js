let user = 0;

const viewCounter = (req, res, next) => {
  user++;

  console.log(user);
  //   res.send("a new user visited");
  next();
};

module.exports = viewCounter;

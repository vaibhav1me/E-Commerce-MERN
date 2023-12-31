const jwt = require("jsonwebtoken");

// Todo
const authenticateUser = (req, res, next) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.json({ message: "Error with token" });
      } else {
        next();
      }
    });
  } else {
    res.json({ message: "Token does not exist. Hence user not logged in" });
  }
};

const checkCurrentUser = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.json({ message: "Token expired" });
      } else {
        res.json(decodedToken);
      }
    });
  } else {
    res.json({ message: "User not logged in" });
  }
};

module.exports = { authenticateUser, checkCurrentUser };

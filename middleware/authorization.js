const jwt = require("jsonwebtoken");
const authorization = (req, res, next) => {
  const {authorization} = req.headers;

  try {
    if (authorization === undefined) {
      return res.json({message: "unauthorized"});
    } else {
      const token = jwt.verify(authorization, "shhh123");
      req.token = token;
    }
    next();
  } catch (error) {
    return res.json(`${error}`);
  }
};

module.exports = authorization;

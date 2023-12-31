const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  const {authorization} = req.headers;

  try {
    if (authorization === undefined) {
      return res.json({message: "unauthorized"});
    } else {
      const token = jwt.verify(authorization, "shhh123");
      console.log(token);
    }
    next();
  } catch (error) {
    return res.json(`${error}`);
  }
};

module.exports = authentication;

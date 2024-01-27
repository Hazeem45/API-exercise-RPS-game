protection = (req, res, next) => {
  const {id} = req.params;
  const tokenId = req.token.id.toString();

  if (id !== tokenId) {
    res.statusCode = 403;
    res.json({message: `request forbidden! your id is ${tokenId}, you should not access any other id`});
  } else {
    next();
  }
};

module.exports = protection;

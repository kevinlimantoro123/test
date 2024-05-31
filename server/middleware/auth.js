const jwt = require("jsonwebtoken");
const SECRET_KEY = "ib0AvWFO3ArcwQ24K1C3uJPGiswpa8QC";

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("token");

  // Check if no token
  if (!token) {
    return res.status(403).json({ message: "Authorization denied" });
  }

  // Verify token
  try {
    //Gives the user id
    const verify = jwt.verify(token, SECRET_KEY);
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

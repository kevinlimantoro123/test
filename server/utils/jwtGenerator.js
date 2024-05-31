const jwt = require("jsonwebtoken");
const SECRET_KEY = "ib0AvWFO3ArcwQ24K1C3uJPGiswpa8QC";

function jwtGenerator(id) {
  const payload = {
    user: id,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

module.exports = jwtGenerator;

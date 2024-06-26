const jwt = require("jsonwebtoken");
const User = require("../models/user-model"); // Import the User model

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  const tokenRegex = /^Bearer (.+)$/;
  const match = authHeader.match(tokenRegex);
  if (!match) {
    return res.status(401).send({ error: "Invalid token format." });
  }

  const jwtToken = match[1].trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });
    if (!userData) {
      return res.status(404).send({ error: "User not found." });
    }

    req.user = userData;
    req.token = jwtToken;
    req.userID = userData._id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
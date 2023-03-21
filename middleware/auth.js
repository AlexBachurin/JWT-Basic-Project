const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  // get authtorization header from request headers
  const authHeader = req.headers.authorization;
  // if auth headers not provided throw error
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("Invalid credentials", 401);
  }
  //   extract token from string which will be `Bearer token`
  // so split string into array and get token from second position
  const token = authHeader.split(" ")[1];
  try {
    // decode jwt token to extract username and id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    // set it to user, and pass it in next method
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("Not auhtorized to access this route", 401);
  }
};

module.exports = authenticationMiddleware;

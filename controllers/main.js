const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  //   validation in the controller, check for username and password
  //   if they are not provided then throw our custom API error
  if (!username || !password) {
    throw new CustomAPIError("username and password should be provided", 400);
  }
  //create token
  //keep payload small for better user experience
  const id = new Date().getTime();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
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
    // decode jwt token to extract username
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const randomNum = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your auth data, your lucky number is ${randomNum}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not auhtorized to access this route", 401);
  }
};

module.exports = { login, dashboard };

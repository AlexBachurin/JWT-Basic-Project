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
  const randomNum = Math.floor(Math.random() * 100);
  console.log(req.user);
  //   extract username from authentication middleware
  const { username } = req.user;
  res.status(200).json({
    msg: `Hello, ${username}`,
    secret: `Here is your auth data, your lucky number is ${randomNum}`,
  });
};

module.exports = { login, dashboard };

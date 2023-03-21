const express = require("express");

const router = express.Router();
const { login, dashboard } = require("../controllers/main");
const authenticationMiddleware = require("../middleware/auth");

// place auth middleware before dashboard, in middleware we have next() method
// which will pass it to dashboard after checking for auth headers
router.get("/dashboard", authenticationMiddleware, dashboard);
router.post("/login", login);

module.exports = router;

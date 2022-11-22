const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const users = await Users.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });

      res.json({ message: "User Created!" });
    });
  } else {
    res.json({ message: "User already exists!" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const accessToken = sign(
          { username: user.username, id: user.id },
          "important"
        );

        res.json({ message: "Login Successful", accessToken: accessToken });
      } else {
        res.json({ message: "Wrong username/password combination!" });
      }
    });
  } else {
    res.json({ message: "User doesn't exist" });
  }
});

module.exports = router;

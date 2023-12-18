const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await User.findOne({ email: email });
    // Password Authentication
    const validPassword = await bcrypt.compare(password, check.password);
    if (email === check.email && validPassword) {
      check.password = null;
      res.status(200).json({
        response: "exist",
        data: check,
      });
    } else {
      res.status(400).json({
        response: "notexist",
        data: null,
      });
    }
  } catch (e) {
    res.status(400).json({
      response: "notexist",
      data: null,
    });
  }
};

exports.Signup = async (req, res) => {
  const { email, password } = req.body;
  // Hash the password
  const hash = await bcrypt.hash(password, 12);

  const data = {
    email: email,
    password: hash,
  };

  try {
    const check = await User.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await User.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
};

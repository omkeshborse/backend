const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel.js");
const generateJwtToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(200);
    throw new Error("All fields are mandatory !");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJwtToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("All email and password is required");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJwtToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
};

const getCurrentUser = async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({ id: _id, name, email });
};

module.exports = { registerUser, loginUser, getCurrentUser };

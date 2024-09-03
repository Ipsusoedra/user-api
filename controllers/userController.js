const { database, currentUserId } = require("../config/database.js");
const { validationResult } = require("express-validator");

exports.getAllUsers = (req, res) => {
  res.json(database);
};

exports.getUserData = (req, res) => {
  const user = database.find((user) => user.id === currentUserId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User tidak ditemukan" });
  }
};

exports.addUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, linkImgProfile } = req.body;
  const newUser = {
    id: database.length + 1,
    name,
    email,
    password,
    linkImgProfile: linkImgProfile || "",
  };
  database.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const user = database.find((user) => user.id === currentUserId);
  if (user) {
    const { name, email, password, linkImgProfile } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (linkImgProfile) user.linkImgProfile = linkImgProfile;
    res.json(user);
  } else {
    res.status(404).json({ message: "User tidak ditemukan" });
  }
};

exports.removeUser = (req, res) => {
  const userIndex = database.findIndex((user) => user.id === currentUserId);
  if (userIndex !== -1) {
    database.splice(userIndex, 1);
    res.json({ message: "User dihapus" });
  } else {
    res.status(404).json({ message: "User tidak ditemukan" });
  }
};

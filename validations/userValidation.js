const { check } = require("express-validator");

exports.validateUser = [
  check("name").isLength({ min: 3, max: 15 }).withMessage("Nama harus terdiri dari 3 sampai 15 karakter"),
  check("email").isEmail().withMessage("Email tidak valid").exists().withMessage("Email harus diisi"),
  check("password").isLength({ min: 7, max: 15 }).withMessage("Password harus terdiri dari 7 sampai 15 karakter"),
];

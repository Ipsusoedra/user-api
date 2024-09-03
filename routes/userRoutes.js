const express = require("express");
const { check } = require("express-validator");
const { getAllUsers, getUserData, addUser, updateUser, removeUser } = require("../controllers/userController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const { validateUser } = require("../validations/userValidation.js");

const router = express.Router();

router.get("/", getAllUsers).post("/", validateUser, addUser);

router.get("/profile", authMiddleware, getUserData).put("/profile", authMiddleware, updateUser).delete("/profile", authMiddleware, removeUser);

module.exports = router;

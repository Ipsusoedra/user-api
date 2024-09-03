const { database, currentUserId } = require("../config/database.js");
exports.authMiddleware = (req, res, next) => {
  const user = database.find((user) => user.id === currentUserId);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ message: "Tidak memiliki hak akses" });
  }
};

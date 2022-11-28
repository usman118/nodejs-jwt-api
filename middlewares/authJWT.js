import jwt from "jsonwebtoken";

const SECRET_KEY = "secret";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.cookie;
  if (authHeader) {
    const token = authHeader.split("token=")[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) res.status(403).json({ message: "Invalid Token" });
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "You are not authenticated" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "You are not an Admin" });
  }
};

export { verifyAdmin, verifyToken };

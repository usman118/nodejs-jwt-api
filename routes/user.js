import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import { verifyAdmin, verifyToken } from "../middlewares/authJWT.js";

const router = Router();

// Dummy Routes
router.get("/", (req, res) => {
  res.send("Hello User Route");
});
// Register Route
router.post("/register", register);
// Login Route
router.post("/login", login);

router.get("/test", verifyToken, verifyAdmin, (req, res) => {
  res.send("Hello User Route");
});

export default router;

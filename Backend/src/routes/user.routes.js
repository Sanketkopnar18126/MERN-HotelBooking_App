import Router from "express";
import {
  logInUser,
  logOut,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/logout").post(verifyJWT, logOut);
export default router;

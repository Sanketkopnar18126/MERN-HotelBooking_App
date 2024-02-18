import Router from "express";
import {
  getHotelData,
  logInUser,
  logOut,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/logout").post(verifyJWT, logOut);

// request for getting user created hotel
router.route("/get_hotels/:id").get(verifyJWT, getHotelData);

export default router;

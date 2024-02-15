import { Router } from "express";
import {
  createHotelForm,
  updateHotelForm,
} from "../controllers/hotel.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/create").post(
  verifyJWT,
  upload.fields([
    {
      name: "imageUrls",
      maxCount: 3,
    },
  ]),
  createHotelForm
);

router.route("/update/:id").post(
  verifyJWT,
  upload.fields([
    {
      name: "imageUrls",
      maxCount: 3,
    },
  ]),
  updateHotelForm
);
export default router;

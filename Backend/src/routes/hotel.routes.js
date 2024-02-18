import { Router } from "express";
import {
  createHotelForm,
  searchHotelByUser,
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

router.route("/update_data/:id").post(
  verifyJWT,
  upload.fields([
    {
      name: "imageUrls",
      maxCount: 3,
    },
  ]),
  updateHotelForm
);

router.route("/get").get(searchHotelByUser);
export default router;

import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { asynchHandler } from "../utils/asynchHandler.js";
import jwt from "jsonwebtoken";
export const verifyJWT = asynchHandler(async (req, res, next) => {
  try {
    const token =
      req?.cookies?.acessToken ||
      req.header("Authorization").replace("Bearer ", "");
    console.log("token", token);

    if (!token) {
      throw new apiError(404, "Unauthorize token");
    }
    const decodedInformation = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log("decodedInformation", decodedInformation);

    const user = await User.findById(decodedInformation?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new apiError(404, "Invalid User In verify Jwt");
    }
    req.user = user;
    console.log("reqUser in verify Jwt:", req.user);
    next();
  } catch (error) {
    console.log("error occur to verify Jwt:", error);
    throw new apiError(400, error?.message || "Invalid acess token");
  }
});

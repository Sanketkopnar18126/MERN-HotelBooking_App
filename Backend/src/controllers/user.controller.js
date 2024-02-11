//  register user

import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asynchHandler } from "../utils/asynchHandler.js";

const registerUser = asynchHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  //   console.log("reqbdy", req.body);
  if (
    [firstname, email, lastname, password].some(
      (fields) => fields?.trim() === undefined
    )
  ) {
    throw new apiError(404, "You have to fill all detais");
  }

  const existedUser = await User.findOne({
    $or: [{ email, lastname }],
  });

  //   console.log("existedUser", existedUser);
  if (existedUser) {
    throw new apiError(404, "User alredy exist");
  }

  const user = await User.create({
    firstname: firstname.toLowerCase(),
    lastname: lastname.toLowerCase(),
    email,
    password,
  });
  //   console.log("user created:", user);
  if (!user) {
    throw new apiError(404, "Something error occur to create User");
  }

  const userWithoutPassword = await User.findById(user?._id).select(
    "-password"
  );
  //   console.log("User without password", userWithoutPassword);
  return res
    .status(200)
    .json(
      new apiResponse(200, userWithoutPassword, "User Successfully Created")
    );
});

export { registerUser };

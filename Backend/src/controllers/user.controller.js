import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asynchHandler } from "../utils/asynchHandler.js";

// generate Access And Refresh Token
const generateAcessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  // console.log("UserGenerate Accesss and ref:", user);
  const acessToken = await user.generateAcessToken();
  // console.log("accesssToKEN", acessToken);
  const refreshToken = await user.generateRefreshToken();
  // console.log("RefreshToKEN", refreshToken);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { acessToken, refreshToken };
};

//  register user

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

// login user
const logInUser = asynchHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  });
  // console.log("user", user);
  if (!user) {
    throw new apiError(404, "User does not exist");
  }
  const checkPassword = await user.isPasswordCorrect(password);
  // console.log("checkPassword", checkPassword);
  if (!checkPassword) {
    throw new apiError(404, "Incorrect Password");
  }
  const { acessToken, refreshToken } = await generateAcessAndRefreshToken(
    user?._id
  );

  const logedIn = await User.findById(user?._id).select(
    "-password -refreshToken"
  );
  // console.log("LogedIn", logedIn);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("acessToken", acessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        { user: logedIn, acessToken, refreshToken },
        "User sucessfully login"
      )
    );
});

// LogOut User

const logOut = asynchHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      refreshToken: undefined,
    },

    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("acessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User Successfully Logout.."));
});

export { registerUser, logInUser, logOut };

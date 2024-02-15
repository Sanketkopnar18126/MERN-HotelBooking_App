import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: "tavalohotel",
  api_key: 515418513756855,
  api_secret: "8YgU8V3yEimvTWU-Cebnt7kUbz0",
});
// console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
// console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
// console.log("SECRETE_KEY:", process.env.SECRETE_KEY);

// console.log("cloudinary config", cloudinary.config());

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // console.log("localpath incloudinary", localFilePath);
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Error occur at cloudinary utils", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };

import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

/*
**
 * json data limit set
 *  use for url encoded
 * store any data in server
 * for get cookie prform some crud operation and read only in server
 *
 * 
 
 */

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import hotelRoutes from "./routes/hotel.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users/hotels", hotelRoutes);
export { app };

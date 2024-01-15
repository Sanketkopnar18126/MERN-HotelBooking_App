import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server start successfully ${process.env.PORT}`);
});

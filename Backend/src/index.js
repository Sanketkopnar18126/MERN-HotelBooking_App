import dotenv from "dotenv";
import ConnectDb from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

ConnectDb()
  .then(() => {
    app.listen(process.env.PORT || 8001, () => {
      console.log(
        `server start successfully....DbConnect!!!${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("Something error occur in Index.js while connect", error);
  });

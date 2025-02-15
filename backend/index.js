const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const MONGO_URL = process.env.MONGO_URL;
const PORT = 3000

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) =>{ 
    console.error("Error:", err)
    process.exit(1);
});


app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

app.use(
    cors({
      origin: ["http://localhost:4000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

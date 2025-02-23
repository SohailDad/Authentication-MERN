const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const MONGO_URL = process.env.MONGO_URL;
const PORT = 4000    //process.env.PORT

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) =>{ 
    console.error("Error:", err)
    process.exit(1);
});


app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

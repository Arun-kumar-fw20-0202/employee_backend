const express = require("express");
const cors = require("cors");
const { connection } = require("./config");
const { userRouter } = require("./Routes/user.router");
const { auth } = require("./Middleware/auth");
const { employee } = require("./Routes/employee");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

app.use("/", userRouter);
app.use(auth);
app.use("/employee", employee);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`server is running on port ${process.env.port} `);
});

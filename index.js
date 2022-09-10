const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const messagesRoute = require("./routes/messages");
const conversationsRoute = require("./routes/conversations");
const postsRoute = require("./routes/posts");

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

//   MIddlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/posts", postsRoute);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});

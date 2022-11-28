import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;
// Connect to MongoDB
const username = "usman";
const password = "usman87626";
const cluster = "backend.kwofzov";
const dbname = "jwtlearn";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Define Routes
app.get("/", (req, res) => {
  next(err);
  // res.send("Dude! Nothing Here.... Goooo Somewhere Else");
});
app.use("/user", userRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.log("ERROR");
  res.send("Dude! Nothing Here.... Goooo Somewhere Else");
  // res.status(500).json({ message: "Something went wrong" });
  // res.send("Something went wrong");
  // next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

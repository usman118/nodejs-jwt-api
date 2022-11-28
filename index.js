import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
// define cors options
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DBNAME, PORT } =
  process.env;
mongoose.connect(
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`,
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

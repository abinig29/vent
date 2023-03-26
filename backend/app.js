import express from "express";
import dotenv, { config } from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import multer from "multer";
import "express-async-errors";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";
import notFound from "./middleware/not_found.js";
import errorHandler from "./middleware/error.js";
import { vent, comment } from "./data.js";
// import Vent from "./models/vent.js";
// import Comment from "./models/comment.js";
import { signupUser } from "./controllers/authController.js";
import {
  authRouter,
  commnetRouter,
  userRouter,
  ventRouter,
} from "./routes/index.js";
const log = console.log;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
mongoose.set("strictQuery", false);

const port = process.env.PORT || 5000;
const stream = fs.createWriteStream(path.join(__dirname, "result.log"), {
  flags: "a",
});
const url = process.env.URL;
// //config ---------------------------------------

const app = express();

// //static folder setup
app.use(express.static("./public"));
// // handle  body with json format
app.use(express.json());

//handle req object

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//cross origin resourse origin

app.use(cors());
app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//log file
app.use(morgan("combined", { stream }));

// parse req object make it ease to work with

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

//routers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("only image is allowd"));
  }
};
const upload = multer({ storage, fileFilter: isImage });
app.post("/api/v1/auth/signup", upload.single("picture"), signupUser);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vent", ventRouter);
app.use("/api/v1/commnet", commnetRouter);
app.use("/api/v1/user", userRouter);
app.use("*", notFound);
app.use(errorHandler);

const connectAndListen = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // await Vent.create(vent);
    // await Comment.create(comment);
    log("db conected");
    app.listen(port, log(`listning through port number${port}`));
  } catch (error) {
    log(error);
  }
};

connectAndListen();

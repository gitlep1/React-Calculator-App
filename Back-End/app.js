const express = require("express");
const cors = require("cors");

const usersController = require("./Controllers/usersController");

require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://react-calculator-frontend.vercel.app",
  "https://react-calculator-backend.vercel.app",
];

app.use(cors());

// app.use(
//   cors({
//     credentials: true,
//     origin: (origin, callback) => {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.options("*", cors());

app.use(express.json());

app.use("/users", usersController);

app.get("/", (req, res) => {
  res.send("Welcome to React Calculator App's Server");
});

app.get("*", (req, res) => {
  res.status(404).send("404 Not Found!");
});

module.exports = app;

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require('express');
const cors = require('cors'); // Add the cors module

require('dotenv').config();

const serviceAccountKey = require("./serviceAccountKey.json");
const app = express();

// Body parser for JSON data

app.use(express.json());

// CORS origin
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// Firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

// API endpoints
app.get("/", (req, res) => {
  return res.send("hello you");
});

const userRoute = require('./routes/user');
app.use("/api/users", userRoute);

const productRoute = require('./routes/products');
app.use("/api/products/", productRoute);

exports.app = functions.https.onRequest(app);

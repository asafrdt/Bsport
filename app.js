const express = require('express');
const app = express();
const bodyparser = require("body-parser")
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
// const dotenv = require("dotenv");
var cookieParser = require('cookie-parser');
// dotenv.config();
//db
mongoose.connect('mongodb+srv://asafrdt:asaf135790@cluster0-ugbzy.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true })
.then(() => console.log('db connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

// bring in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// middleware
app.use(morgan("dev")); //creating a log in the console after every request from the server
app.use(bodyparser.json()); //every body is send as a json format
app.use(cookieParser());
app.use(expressValidator());

app.use("/", postRoutes);
app.use("/",authRoutes);
app.use("/", userRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorized!"});
    }
  });


const port = 3000;
app.listen(port, () => {
    console.log(`A Node js api is listening on port:${port}`);
});
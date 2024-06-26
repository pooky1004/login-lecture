"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const logger = require('./src/config/logger');
const dotenv = require("dotenv");


const app = express();
dotenv.config();

// const accessLogStream = require("./src/config/log");

// 라우팅
const home = require("./src/routes/home");

// 웹 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/src/public`))
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 못하는 문제 해결
app.use(bodyParser.urlencoded({extended: true}));
// app.use(morgan("tiny"));
// app.use(
//     morgan(":method :url :status :res[content-length] - :response-time ms")
// );
// app.use(morgan(":remote-user :method :date[web]", { stream: accessLogStream }));
// app.use(morgan("combined"));
// app.use(morgan("dev"));
// app.use(morgan("common", { stream: accessLogStream }));
app.use(morgan("tiny", { stream: logger.stream }));


app.use("/", home); // use -> 미들 웨어를 등록해 주는 메서드

module.exports = app;

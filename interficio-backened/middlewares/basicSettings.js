"use strict";

let bodyParser = require("body-parser");
let favicon = require("serve-favicon");
let path = require("path");
let morgan = require("morgan");
let express = require("express");

module.exports = app => {

    app.set("view engine", "ejs");
    app.set('views', path.join(__dirname, '/../views/'));
    app.set("json spaces", 2);
    app.set("x-powered-by", false);
    if (process.env.NODE_ENV !== "test") {
        app.use(morgan("dev"));
    }
    // socketServer.start();
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
     app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
};

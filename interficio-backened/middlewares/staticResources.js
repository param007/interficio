"use strict";

let express = require("express");

module.exports = app => {
    app.use(express.static("public"));
    app.use('/node_modules', express.static("node_modules"));
};

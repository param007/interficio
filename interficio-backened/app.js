"use strict";

let express = require("express");
let consign = require("consign");
let logger = require("winston");
let app = express();
let dotenv = require("dotenv");

dotenv.load({ path: ".env" });

let appPort = process.env.APP_PORT || "3020";

consign()
    .include("./middlewares/basicSettings.js")
    .then("./helpers")
    .then("./middlewares/staticResources.js")
    .then("./models")
    .then("./controllers")
    .then("./middlewares/auth.js")
    .then("./routes")
    .then("./middlewares/mainRoutes.js")
    .then("./middlewares/errorHandler.js")
    .into(app);

if (process.env.NODE_ENV !== "test") {
    app.listen(appPort, () => {
        logger.info(`Server started on port ${appPort}`);
    });
}
module.exports = app;

"use strict";

module.exports = app => {
  app.use('/api/v1/question', app.routes.question);
  app.use('/api/v1/register', app.routes.register);
};

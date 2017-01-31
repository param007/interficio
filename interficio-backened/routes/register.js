"use strict";

let router = require('express').Router(),
  jwt = require('jsonwebtoken'),
  readfile = require('fs-readfile-promise');

module.exports = app => {

  let registerController = app.controllers.register;
  let auth = app.middlewares.auth;

  router.post('/login', (req,res) => {
    console.log('loginnn',req.body);
    let data = req.body;
    registerController.userLogin(data)
      .then(data => {
        console.log("final response---msg---",data);
        res.send(data);
      })
      .catch(error => {
        console.log("error--",error);
        res.status(500);
      })
  });

  router.get('/getUserDetail', (req,res) => {
    console.log('asdfsdf');
    let token_data;
    let token = req.query.token;

     if (token) {
      let decoded_data = {}, token_data = {};
      let auth = false;
      readfile('config/id_rsa','base64')
        .then(key_value => {
        jwt.verify(token, key_value.toString(), function(error, decoded) {
          if (error) {
            console.log("error--",error);
            return res.send({not_verified: true});
          } else {
            auth = true;
            decoded_data = decoded;
          }
          token_data = {
            data: decoded_data,
            auth: auth
          }
          console.log('token dataaa',token_data);
          return res.send(token_data);
         })
      })
      .catch(error => {
        console.log("error-auth-",error);
      })
    } else {
      return res.send({not_verified: true});
    }
  })

return router;
}

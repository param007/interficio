"use strict"

let router = require('express').Router();
let moment = require('moment');

module.exports = app => {

  let questionController = app.controllers.question;

  router.get('/fetchSet', (req, res) => {
    let user_id = req.query.user_id;
    console.log('routess',user_id);
    questionController.fetchSet(user_id)
      .then( data => {
        res.send(data);
      })
      .catch( error => {
          res.status(500);
      })
  });

  router.get('/fetchQuestion', (req, res) => {
    let set_id = req.query.set_id;
    questionController.fetchQuestion(set_id)
      .then( data => {
        res.send(data);
      })
      .catch( error => {
          res.status(500);
      })
  });

  router.post('/answerSubmit', (req,res) => {
    questionController.answerSubmit(req.body)
      .then( data=> {
        console.log(data);
        res.send(data);
      })
      .catch( error => {
        res.status(500);
      })
  })

  router.get('/fetchScore', (req,res) => {
    console.log('fetch score');
    questionController.fetchScore()
      .then( data=> {
        console.log(data);
        res.send(data);
      })
      .catch( error => {
        res.status(500);
      })
  })

  router.post('/storySubmit', (req,res) => {
    let data = req.body;
    data.date = Number(data.date);
    console.log('timestamp',typeof(data.date),data.date);
    data.date = moment(data.date).format('YYYY-MM-DD HH:mm:ss');
    questionController.storySubmit(data)
      .then( data=> {
        console.log('router',data);
        res.send(data);
      })
      .catch( error => {
          res.status(500);
      })
  })

  return router;
}

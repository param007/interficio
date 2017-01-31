"use strict";

var  db = require('../config/db');

module.exports = {
  fetchQuestion: function (data) {
    let query =  `SELECT id,description from question where story_id = :data`;
    return db.query(query, {replacements: {data: data}, type: db.QueryTypes.SELECT})
     .then(data => {
       return data;
     })
      .catch(error => error);
  },
  fetchSet: function (data) {
    let query =  `SELECT id,description,title from story where id = :data`;
    return db.query(query, {replacements: {data: data}, type: db.QueryTypes.SELECT})
     .then(data => {
       return data;
     })
     .catch(error => {
       console.log('errorrrr',error)
       return error;   
     });
  },
  answerSubmit: function (data) {
    let obj;
    console.log(data);
    let query =  `SELECT answer,url from question where id = :data`;
    return db.query(query, {replacements: {data: data}, type: db.QueryTypes.SELECT})
     .then(data => {
       console.log(data);
       return data[0];
     })
     .catch(error => {
       console.log('errorrrr',error)
       return error;   
     }); 
  },
  storySubmit: function (data) {
    let obj;
    let query =  `SELECT answer from story where id = :data`;
    return db.query(query, {replacements: {data: data}, type: db.QueryTypes.SELECT})
     .then(data => {
       console.log(data);
       return data[0];
     })
     .catch(error => {
       console.log('errorrrr',error)
       return error;   
     }); 
  }
};

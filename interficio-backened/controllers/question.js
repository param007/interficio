"use strict";

var newPromise = require('es6-promise').Promise;

module.exports = app => {
  let user = app.models.users_repo,
    question = app.models.questions_repo, story_id;

  let fetchSet = function (user_id) {
    console.log('controllers',user_id);
    return user.fetchSetId(user_id)
      .then( data=> {
        console.log('set_id from user_id',data);
        story_id = data[0].story_id;
        console.log('set iddd',story_id);
        return question.fetchSet(story_id)
      })
      .then( data=> {
        return data[0];
      })
      .catch( error=> error);
  };

  let fetchQuestion = function (set_id) {
     return question.fetchQuestion(set_id)
      .then( data=> {
        // console.log(data);
        return data;
      })
      .catch( error=> error);
  }

  let answerSubmit = function (answerObj) {
    console.log('answer', answerObj);
    let answer = answerObj.answer,answer_id = answerObj.id, obj;
    return question.answerSubmit(answer_id)
    .then( data=> {
      console.log('right ans',data,'submitted ans',answer);
      if(data.answer == answer) {
        return {verified: true, url: data.url};
      } else {
        return {verified: false};
      }
    })
    .catch( error => error);
  }

  let fetchScore = function () {
    return user.fetchScore()
    .then( data => {
      let length = data.length;
      let arr = [],i;
      for(i=0;i<length;i++){
        if(data[i].score == data[i+1].score) {
          count++;
        } else if(count){
          call()
        }

      }
      let j;
      let call = function(a,b) {
        for(j=a;j<=b;j++) {
          data[a].score = data[b].score;
          data[b].score = data[a].score;
           b--;
        }
      }
      return data;
    })
    .catch( error=> error);
  }

  let storySubmit = function (storyObj) {
    console.log('stroy obj', storyObj);
    let answer = storyObj.answer, story_id = storyObj.id, obj, user_id = storyObj.user_id, date = storyObj.date;
    console.log('dateee', date);
    return question.storySubmit(story_id)
    .then( data=> {
      if(data.answer == answer) {
        obj = {verified: true};
        return user.updateDetail(user_id,date);
      } else {
        obj = {verified: false};
        return Promise.resolve(data);
      }
    })
      .then( data => {
        console.log('data',data);
        return obj;
      })
     .catch( error=> error);
  }

 return {
    fetchSet,
    fetchQuestion,
    answerSubmit,
    storySubmit,
    fetchScore
  };
}

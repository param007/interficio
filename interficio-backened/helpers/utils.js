"use strict";
/* jshint multistr: true */

 let jwt = require('jsonwebtoken'),
   readfile = require('fs-readfile-promise');

module.exports = {

 getHash: function (password) {

    return crypto.createHash('sha1').update(password).digest('base64');
 },

 formToken: function(user)
  {
   console.log('util',user);
   return readfile('config/id_rsa','base64')
     .then(key => {
       let token = jwt.sign(user, key.toString(),
         { expiresIn: 60*60*24 });
      console.log('getToken', token);
      return {
        success: true,
        message: 'Enjoy your token',
        token: token,
        user_id: user.user_id,
        user_name: user.user_name
     };
   })
   .catch(error => error)
 }
}

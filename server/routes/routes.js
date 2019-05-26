//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../../models/user.js');

const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/signup', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
  console.log('bv coae');
  res.json({ 
    message : 'Signup successful',
    user : req.user 
  });
});

router.post('/login', async (req, res, next) => { 
  const {remember}= req.body;
  console.log("aici am ajuns");
  passport.authenticate('login', async (err, user, info) => {  
    try {
      if(err || !user){
        console.log(JSON.stringify(err));
        res.status(404).send(err);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error);
        console.log("intru in login in routes ");
        console.log("user: " +user);
        console.log(error);
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { _id : user._id, email : user.email };
        //Sign the JWT token and populate the payload with the user email and id
          if(!remember){
        const token = jwt.sign({ user : body },'top_secret',{
          expiresIn: "1d"} );
        console.log("nu si-a amintit doar 1 zi "+ token);
        return res.json({ token });
  
      }
        else { const token = jwt.sign({ user : body },'top_secret',{
          expiresIn: "7d"} ); console.log("si-a amintit boss " +token);
          return res.json({ token });

        }
        //Send back the token to the user
      });   
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;

const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const Contacts = require('./../../models/contacts.js'); 
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/profile', (req, res, next) => {
  //We'll just send back the user details and the token
  res.json({
    message : 'You made it to the secure route',
    user : req.user,
    token : req.query.secret_token
  })
});

router.get('/contacts',(req,res,next) =>{
Contacts.find({userId:req.user._id})
    .exec(function (err, contacts) {
      if (err) return handleError(err);
      res.json( contacts);
     })

})
router.post('/contacts',(req,res,next) =>{
  var {name, company, about, gender, age, phone, tags,email,cathegory} = req.body;
  
  var userId =  mongoose.Types.ObjectId(req.user._id);
  var contactsData= {
    userId,name, company, about, gender, age, phone,email, tags, cathegory
  };
  console.log(contactsData);
 // console.log(req);
  Contacts.create(contactsData, function (err, contacts) {
        if (err) return handleError(err);
        res.json( contacts);
       })
  
  })
  router.delete('/contacts/:id',(req,res,next) =>{
    Contacts.findOneAndRemove({_id: req.params.id}, function (err, data) {
      if (err) {
          return res.status(500).send(err);
      }
      console.log("yayayay");
      return res.status(200).send(data);
  })

  })

module.exports = router;
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true

  },
  surname:{
    type: String,
    required: true, 
   trim: true
  },
  birthdate: {
    type: Date
  },
  gender:{
    type: Boolean //0 for boys 1 for girls
  },
  registerdata:{
    type:Date,
    default: Date.now()

  },
});
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({$or: [
    {email: email},
    {username: email}
]})
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        let err={};
        err.message = "The user does not exist.";
        err.status = 404;
        console.log(JSON.stringify(err) + " authschema");
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          console.log("parola e ok");
          return callback(null, user);
        } else {
          let err={};
          err.message = "The password is wrong.";
          err.status = 401;
          console.log("parola gresita");
          return callback(err);
        }
      })
    });
}
UserSchema.pre('save', async function (next) {
  var user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();


});
var User = mongoose.model('User', UserSchema);
module.exports = User;

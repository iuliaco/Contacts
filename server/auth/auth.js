
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../../models/user.js');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;



//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({ passReqToCallback : true},async (req,username, password, done) => {
    try {
      const { email, name, surname, birthdate, gender} = req.body;

        console.log("sunt in passport");
        console.log(`email: ${email}`);
        console.log(`password: ${password}`);
        console.log(email);

        console.log(req);
      //Save the information provided by the user to the the database
      const user = await User.create({ email, password, name, surname, birthdate, gender, username });
      //Send the user information to the next middleware
      return await  done(null, user);
    } catch (error) {
      done(error);
    }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy(async (email, password, done) => {
  try {
    //Find the user associated with the email provided by the user
    console.log("am ajuns in passport");
    User.authenticate(email, password, function (error, user) {
        if (error || !user) {
          //res.status(401).send('Emailul/numele de utilizator si/sau parola nu sunt corecte.');
          console.log(JSON.stringify(error)+ " authenticate");
          return done(error);

        } else {
   
            return done(null, user, { message : 'Logged in Successfully'});
            
  }
      });
    
} catch (error) {
  console.log(error + " catch");  
  return done(error);
  
  }

}));
passport.use(new JWTstrategy({
  //secret we used to sign our JWT
  secretOrKey : 'top_secret',
  //we expect the user to send the token as a query paramater with the name 'secret_token'
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    //Pass the user details to the next middleware
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));

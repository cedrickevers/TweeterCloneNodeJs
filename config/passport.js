const passport = require("passport");
const localStategy = require("passport-local").Strategy;
const User = require("../models/user"); 

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
})

passport.use("local-login", new localStategy( {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({email, email}, function(err, user) {
        if(err) return done(err);

        if (!user) return done(null, false, req.flash("loginMessage", "No user found"));

        if(!user.comparePassword(password)) return done(null, false, req.flash("LoginMessage","Wrong password dude"  ));
       

        return done(null, user);
    })
}
    
    ))
const router = require("express").Router();
const passport = require("passport")
const passportConfig = require("../config/passport");
const User = require("../models/user");



router.route("/signup").get((req, res, next) => {
    res.render("accounts/signup", {message: req.flash("errors")})
}).post((req, res, next) => {
    User.findOne({ email: req.body.email}, function(err, existingUSer){
        if (existingUSer) {
            req.flash("errors", "Account with that Emil already exist");
            res.redirect("/signup")
        } else{
            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.photo = user.gravatar();
            user.password = req.body.password;
  
            user.save(function(err){
                req.login(user, function(err){
                    if (err) return next(err);
                    res.redirect("/");

                });

                })

        }
    });
});

router.route("/login")
.get((req, res, next) =>{
    if(req.user) res.redirect("/");
    res.render("accounts/login", {message: req.flash("LoginMessage")}) 
})
.post(passport.authenticate("local-login", {

    successRedirect: "/",
    faillureRedirect: "/login",
    faillureFlash: true

})) ;

router.get("/logout",( req, res, next) => {
    req.logout();
    res.redirect("/");

});

 module.exports = router;
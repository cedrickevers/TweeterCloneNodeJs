const router = require("exress").Router;
const User = require("../models/users");

router.route("/signup").get((req, res, next) => {
    res.render("accounts/signup", {message: req.flash(errors)})
}).post((req, res, next) => {
    User.findOne({ email: req.body.email}, function(err, existingUSer){
        if (existingUSer) {
            req.flash("error", "Account with that Emil already exist");
        } else{
            let user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.photo = user.gravatar();
            user.password = req.body.password;

            user.save(function(err){
                req.login(user, function(err){
                    if (err) return next(err);
                    res.redirect("/");
                });
            });

        }
    });
});

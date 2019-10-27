const router = require("express").Router();
const User = require("../models/user");

router.get("/", (req, res, next) => {
    if(req.user) {
        res.render("main/home");
    }
    else{
        res.render("main/landing");

    }

});

    router.get("/create-new-user", (req, res, next) => {
        var user = new User() ;

        user.email= "test@email.com";
        user.name= "test";
        user.password= "test";
        user.save(function(err) {
            if (err){
                return next (err);
              
            }
            else{

                res.json("successfully created");
            }
            })
        })

 
    module.exports = router;
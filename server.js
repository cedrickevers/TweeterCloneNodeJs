const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request');
const async = require('async');
const expressHbs = require ('express-handlebars');
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require('connect-mongo')(session);
const mongoose = require("mongoose");
const config = require("./config/secret");
const passport = require("passport")
var cookieSession = require('cookie-session');
const cookieParser = require("cookie-parser")

const app = express();


mongoose
  .connect(
    "mongodb://miakis:test@cluster0-shard-00-00-lnbwl.mongodb.net:27017,cluster0-shard-00-01-lnbwl.mongodb.net:27017,cluster0-shard-00-02-lnbwl.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log("Error: ", err.message));

app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');app.set('view engine', 'hbs')
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 

app.use(session({
  resave:true,
  saveUnitialized:true,
  secret:  "secret",
  store: new MongoStore({ url: "/mongodb://miakis:test@cluster0-shard-00-00-lnbwl.mongodb.net:27017,cluster0-shard-00-01-lnbwl.mongodb.net:27017,cluster0-shard-00-02-lnbwl.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

  , autoReconnect : true})
     

 
})) 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())


app.use(function(req, res, next){
  res.locals.user = req.user;
  next();

})

const mainRoutes = require("./routes/main") ;
const userRoutes = require("./routes/user");
app.use(mainRoutes);
app.use(userRoutes);
app.listen(7777, (err) =>{
    if(err){
        console.log(err)
    }
    else console.log('All seven wins !')
})



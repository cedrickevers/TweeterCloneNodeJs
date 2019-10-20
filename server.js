const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const request = require("request");
const async = require("async");
 
const app = express();
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended : false}));
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
    res.json("test")
});

app.listen(7777, (err) =>{
    if(err){
        console.log(err)
    }
    else console.log("All seven wins !")
})



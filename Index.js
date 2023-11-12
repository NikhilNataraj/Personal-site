//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('port', port);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("Home", {
        currentYear: new Date().getFullYear(),
    });
});

app.get("/work", function(req, res){
    const d1 = new Date("2022-05-16");
    const d2 = new Date()
    var months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();

    var years = Math.floor(months / 12);
    months = months % 12 + 1;

    plural_y = years>1?"s":"";
    plural_m = months>1?"s":"";

    res.render("work", {
        currentYear: d2.getFullYear(),
        noOfYears : years,
        noOfMonths : months,
        sy : plural_y,
        sm : plural_m
    });
});


app.get("/contact", function(req, res){
    res.render("contact", {
        currentYear: new Date().getFullYear(),
    });
});
  
app.listen(port);


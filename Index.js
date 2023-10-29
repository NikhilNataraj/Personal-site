//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("Home", {
        currentYear: new Date().getFullYear(),
    });
});

app.get("/about", function(req, res){
    const d1 = new Date("2022-05-16");
    const d2 = new Date()
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();

    var years = Math.round(months / 12);
    months = months % 12 + 1;

    plural_y = years>1?"s":"";
    plural_m = months>1?"s":"";
    res.render("about", {
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
  
app.listen(port, function() {
    console.log("Server started on port "+port);
  });


//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9001;

app.set('view engine', 'ejs');
app.set('port', port);
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

function getCurrentYear() {
    return new Date().getFullYear();
}

app.get("/", function(req, res){
    res.render("Home", {
        currentYear: getCurrentYear(),
    });
});

app.get("/work", function(req, res){
    const d1 = new Date("2022-05-16");
    const d2 = new Date()
    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();

    const years = Math.floor(months / 12);
    months = months % 12 + 1;

    const plural_y = years > 1 ? "s" : "";
    const plural_m = months > 1 ? "s" : "";

    res.render("Work", {
        currentYear: d2.getFullYear(),
        noOfYears : years,
        noOfMonths : months,
        sy : plural_y,
        sm : plural_m
    });
});


app.get("/contact", function(req, res){
    res.render("Contact", {
        currentYear: getCurrentYear(),
    });
});
  

app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.use(express.static("public"));


app.listen(port, () => {
    console.log("Server is running on port " + port);
});
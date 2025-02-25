
require('dotenv').config();
const nodemailer = require("nodemailer");
var  express = require("express");
var app = express();
var projects = require("./projects.json");
var exphbs = require("express-handlebars").create({
    extname: ".hbs",
    defaultLayout: false,
    helpers: require("./helper")
});
const path = require("path");
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static('public'));


app.set("views", path.join(__dirname, "views"));
app.engine("hbs", exphbs.engine);
app.set("view engine", ".hbs");



app.get("/", function(req, res) {
    res.render("home.hbs");
});
app.get("/contact", function(req, res) {
    res.render("contact");
});
app.get("/contact", function(req, res){
    res.render("contact", {submitted: "no"});
});
app.get("/work", function(req, res) {
    res.render("work", {projects: projects});

});

app.get("/about", function(req, res) {
    res.render("about");
})

app.get("/projects/:pid", function(req, res, next) {
    console.log("log project id");
    console.log(req.params.pid);
    var pid = req.params.pid;
    var thisproject = projects[pid.toString()];
    console.log(thisproject);
    res.render("project", { project: thisproject});
});


// step 1 - transporter



app.post("/contact", function(req, res, next){
    console.log("contact form posted");
    console.log(req.body);
    var name = req.body.fullname;
    var email = req.body.email;
    var note = req.body.note;
    var subject = req.body.subject;

    //step 2
    let mailOptions = {
        from: "aderemiazeez6@gmailcom",
        to: "aderemiazeez6@gmail.com",
        subject: req.body.subject,
        text: req.body.note,
        html: "<b>Full Name </b>" + name + "<br><b>Email </b>" + email + "<br><b>Message </b>" + note
    };
    //step 3
    transporter.sendMail(mailOptions, function(err, data) {
        if(err) {
            console.log("Error sending email.") 
        } else {
            console.log("Email sent!")
            res.render("contact", {submitted: "yes"});
        }
    });
});


module.exports = app;
/*
var port = process.env.PORT || 8080;
app.listen(port, function() {
console.log("Express started. Listening on port %s", port);
});

// Removed JSON content
*/

/*********************************************************************************
* WEB700 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Mabel Kwakye Student ID: 128876224 Date: July 24, 2023
* Online (Cyclic) Link:  https://easy-jade-donkey-gown.cyclic.app
*

********************************************************************************/

const {initialize,
    getAllStudents,
    getCourses,
    getStudentByNum,
    getStudentsByCourse, 
    addStudent,
    updateStudent,
    getCourseById
} = require('./modules/collegeData.js');

    
var HTTP_PORT = process.env.PORT || 8080;
var path = require("path");
var express = require("express");
const bodyParser = require('body-parser');
var app = express();
const exphbs = require('express-handlebars');

app.engine('.hbs', exphbs.engine({ extname: '.hbs',
    helpers: {
        navLink: function(url, options){
            return '<li' +
            ((url == app.locals.activeRoute) ? ' class="nav-item active" ' : ' class="nav-item" ') +
            '><a class="nav-link" href="' + url + '">' + options.fn(this) + '</a></li>';
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
            return options.inverse(this);
            } else {
            return options.fn(this);
            }
        }
           
    }
}));
//  This is Mabel's change 
// This is my second comment
// This is Portia's first change


app.set('view engine', '.hbs');


// This is Portia's Change
// This is Portia's new change

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));


function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(function(req,res,next){
    let route = req.path.substring(1);
    app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.*)/, "") : route.replace(/\/(.*)/, ""));
    next();
   });


// This Olubunmi's Comments

app.get('/', (req, res) => {
    res.render('home'); 
  });
  
//this change is done by David
app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/htmlDemo", (req, res) => {
    res.render('htmlDemo');
});

app.get("/addStudent", (req, res) => {
    res.render('addStudent');
});


// This is a comment by Portia
app.get("/students", (req, res) => {    
        if(req.query.course){
            getStudentsByCourse(req.query.course).then(
                function (data) {
                    res.send(data);
        
                  }
                ).catch(function(reason){
                    console.log(reason);
            });
        }
        else {

            getAllStudents().then(
            function (data) {   
                res.render("students",
                    {students: data});
            }
            ).catch(function(reason){
                res.render("students", {message: "no results"});
            });
        }   
});

// This is for the courses
app.get("/courses", (req, res) => {
        getCourses().then(
        function (data) {
            res.render("courses",
                    {courses: data});

          }
        ).catch(function(reason){
            res.render("courses", {message: "no results"});
    });
});
// This is for the a new courses
// This is for the course_id
app.get("/course/:id", (req, res) => {
    getCourseById(req.params.id).then(
    function (data) {   
        res.render("course", {course: data});

      }
    ).catch(function(reason){
        res.render("course", {message: "no results"});
});
});

app.get("/student/:num", (req, res) => {
        getStudentByNum(req.params.num).then(

            
        function (studentData) {  
            getCourses().then(
                function (coursesData) {
                    res.render("student",
                            {student: studentData,
                            courses: coursesData});
        
                  }
                ).catch(function(reason){
                    res.render("courses", {message: "no results"});
            });             
          }
        ).catch(function(reason){
            res.render("student", {message: "no results"});
    });
});

app.post("/students/add", (req, res) => {
    addStudent(req.body).then(
        res.redirect('/students')
    ).catch(function(reason){
        console.log(reason);
});
});

app.post("/student/update", (req, res) => {
    updateStudent(req.body).then(
        res.redirect('/students')
    ).catch(function(reason){
        console.log(reason);
    });
   });
   


app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

initialize()
    .then( () => {
        app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
    }).catch(function(reason){
        res.send(reason);
});
// setup http server to listen on HTTP_PORT

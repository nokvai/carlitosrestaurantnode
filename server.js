//Initiallising node modules
var express = require("express");
require('dotenv').config();
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 
const path = require('path');
var cors = require("cors");
const axios = require("axios");
const router = express.Router();
var session = require('express-session');
 
// var api_restaurant = require("./routes/restaurant");
// var api_user = require("./routes/user");
var api_itemcategory = require("./routes/itemcategory");
var api_item = require("./routes/item");
var api_orders = require("./routes/orders");
var api_orderitems = require("./routes/orderitems");
var api_kitchen = require("./routes/kitchen");
var api_sales = require("./routes/sales");

// Body Parser Middleware 
// app.use(bodyParser.json({ type: "application/*+json" })); 
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(cors());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
    next();
});

//expose css and js resource
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src'));

//Initialising connection string
var dbConfig = {
    user:  process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME
};

 // call apis from export
//  api_restaurant(app, bodyParser, axios, dbConfig, sql);
//  api_user(app, bodyParser, axios, dbConfig, sql);
 api_itemcategory(app, bodyParser, axios, dbConfig, sql);
 api_item(app, bodyParser, axios, dbConfig, sql);
 api_orders(app, bodyParser, axios, dbConfig, sql);
 api_orderitems(app, bodyParser, axios, dbConfig, sql);
 api_kitchen(app, bodyParser, axios, dbConfig, sql);
 api_sales(app, bodyParser, axios, dbConfig, sql);

//----------------HTML------------------- 
// app.get('/index.html',function(req,res){
//   res.sendFile(path.join(__dirname + '/index.html')); 
// });

// app.get('/css/bootstrap.min.css',function(req,res){
//   res.sendFile(path.join(__dirname+'/css/bootstrap.min.css'));
// });

// app.get('/js/jquery.min.js',function(req,res){
//   res.sendFile(path.join(__dirname+'/js/jquery.min.js'));
// });

// app.get('/js/popper.min.js',function(req,res){
//   res.sendFile(path.join(__dirname+'/js/popper.min.js'));
// });

// app.get('/js/bootstrap.min.js',function(req,res){
//   res.sendFile(path.join(__dirname+'/js/bootstrap.min.js'));
// });

  // app.get('/',function(req,res){ 
  //  res.sendFile(path.join(__dirname+'/src/index2.html')); 
  // });
  


  // app.get('/logout',(req,res)=>{
  //   req.session.destroy(function (err) {
  //     res.redirect('/'); //Inside a callback… bulletproof!
  //    }); 
  // })

  // app.post('/auth', function(req, res) {
  
  //   var username = req.body.username;
  //   var password = req.body.password;
    
  //   if (username && password) { 
  //        //const result = await sql.query`SELECT * FROM view_userlogin WHERE [UserName] = ${username} AND [Password] = ${password}`
  //        sql.connect(dbConfig, function (err) {
  //         if (err) {   
  //             console.log("Error while connecting database :- " + err);
  //             res.send(err);
  //         }
  //         else {
  //             // create Request object
  //             var request = new sql.Request();
  //             // query to the database
  //             var qry = `SELECT * FROM view_userlogin WHERE [UserName] = '${username}' AND [Password] = '${password}'`;
  //             request.query(qry, function (err, response) {
  //                 if (err) {
  //                   console.log("Error while querying database :- " + err);
  //                   res.send(err);
  //                 } else {
  //                     //res.send(response[0]);
  //                 //     // console.log(response); 
  //                 //     // res.send(response[0].UserName);
  //                     if (response[0] != null) { 
  //                       req.session.loggedin = true;
  //                       req.session.username = response[0].UserName;
  //                       req.session.UserLoginId = response[0].UserLoginId; 
  //                       res.end();
  //                       res.redirect('/home');
                      
  //                     } else {
  //                       //res.send('Incorrect Username and/or Password!');
  //                        res.redirect('/'); 
  //                     }			 
  //                 sql.close();
  //                 }
  //             });
  //         }
  //     });
      
           
  //   } else {
  //     res.send('Please enter Username and Password!');
  //     res.end();
  //   }
  // });

  // app.get('/home', function(request, response) {
  //     if (request.session.loggedin) {
  //      // response.send('Welcome back, ' + request.session.username + '!');
  //       response.sendFile(path.join(__dirname+'/src/home.html')); 
        
  //     } else {
  //       // response.send('Please login to view this page!');
  //       response.redirect('/home');
  //     } 
  // });

  // app.get('/setsessionloginvalue', function(req, res) {
  //   if (req.session.loggedin) {
  //     req.session.UserLoginId = 1;
  //     return res.send({ response: "OK" });
  //   } 
  // });

  // app.get('/getsessionloginvalue', function(req, res) {
  //   if (req.session.loggedin) { 
  //     return res.send({ response: req.session.UserLoginId });
  //   } 
  // });

  
// app.get('/', function(request, response) {
//   response.sendFile(path.join(__dirname+'/src/home.html'));
// });

// app.get('/kitchen', function(request, response) {
//   response.sendFile(path.join(__dirname+'/src/kitchen.html'));  
// });
 

  
var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'src'));
app.set('view engine', 'html');

var MY_IP = process.env.SERVER_IP;

app.get('/', function(req, res, next) {
  res.render('home', { my_ip: MY_IP });
});

app.get('/kitchen', function(req, res, next) {
  res.render('kitchen', { my_ip: MY_IP });
});
 
app.get('/void', function(req, res, next) {
    res.render('void', { orderid: req.query.id });
});
 
app.get('/print', function(req, res, next) {
  res.render('print', { 
      orderid: req.query.orderid, 
      tableno: req.query.tableno, 
      ordertype: req.query.ordertype, 
      orderdatetime: req.query.orderdatetime, 
      ordertakenby: req.query.ordertakenby,
      notes: req.query.notes
    });
});

app.get('/sales', function(req, res, next) {
  // response.sendFile(path.join(__dirname+'/src/sales.html'));  
  res.render('sales', { startdate: req.query.startdate, enddate: req.query.enddate });
});

app.get('/kdestorque4c98d92e-b372-4c43-9773-e6b86c24a3a4', function(req, res, next) {
  res.render('kdestorque', { startdate: req.query.startdate, enddate: req.query.enddate });
});


//Setting up server
var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port; 
  console.log("App now running on port", port);
});
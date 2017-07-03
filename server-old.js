var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var index=require('./app/app');

var port=3000;
var app=express();

//View engine


  app.get('*', function(req, res) {
        res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

/*app.get('/', function(req, res){
  // res.send("Hello World!");
  next();
});*/

app.listen(3000);
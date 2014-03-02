'use strict';

// Module dependencies.
var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var http = require('http');
var redis = require('redis');



var app = express();



var mysql = require('mysql');
var PORT = 3306;
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'todo'
});

connection.connect(function(err) {
    if(err) console.log("Could not connect to DB");
    else{
        console.log("Connected to DB");
    }
});


//connection.end();


// Express Configuration
require('./lib/config/express')(app);

// Controllers
var api = require('./lib/controllers/api'),
    index = require('./lib/controllers');

// Server Routes
app.get('/api/awesomeThings', api.awesomeThings);

// Angular Routes
app.get('/partials/*', index.partials);
app.get('/', function(req,res){
    res.render('index');
    //res.redirect("/dashBoard");
});

app.get('/submitpoem/:text',function(req,res){
    var p =req.params.text;
    console.log(p,typeof  p);
    var query='insert into poemlist (poem) values ("' + p + '")';
    console.log("query",query);
    connection.query(query,function(err,result){
        console.log("error",err,result);
        connection.query("SELECT * FROM poemlist",function(err,result){
            console.log("select",err,result);
            res.json(result);
        });
    });

});

app.get('/deletepoem/:id',function(req,res){
    var p =req.params.id;
    console.log(p,typeof  p);
    var query='delete from poemlist where id =' + p + '';
    console.log("query",query);
    connection.query(query,function(err,result){
        console.log("error",err,result);
        connection.query("SELECT * FROM poemlist",function(err,result){
            console.log("select",err,result);
            res.json(result);
        });
    });
});

app.get('/showchart/',function(req,res){
    var query='SELECT * FROM poemlist';
    connection.query(query,function(err,result){
        console.log(result);
        var oldres = result;
        var newres = new Array();
        for(var i=0;i<oldres.length;i++)
        {
            console.log("value",oldres[i]);
            var obj={name:oldres[i].poem,data:[oldres[i].id]};
            newres.push(obj);
        }
        res.json(newres);
    });
});

app.get('/editpoem/:id/:text',function(req,res){
    var t =req.params.text;
    var i =req.params.id;
    console.log(t,typeof  t);
    console.log(i,typeof  i);
    var query='UPDATE poemlist SET poem="'+ t +'" where id='+ i +'';
    console.log("query",query);
    connection.query(query,function(err,result){
        console.log("error",err,result);
        connection.query("SELECT * FROM poemlist",function(err,result){
            console.log("select",err,result);
            res.json(result);
        });

    });
});

app.get('/viewpoem/:id',function(req,res){
    var i =req.params.id;
    console.log(i,typeof  i);
    var query='SELECT poem FROM poemlist where id='+ i +'';
    console.log("result",query);
    connection.query(query,function(err,result){
        console.log("select",result);
        res.json(result);
    });
});


app.get('/showpoemdashboard',function(req,res){
    var query='SELECT * FROM poemlist';
    connection.query(query,function(err,result){
        console.log("select",err,result);
            res.json(result);

        });
});


app.get('/showpoem/:text',function(req,res){
    var p =req.params.text;
    console.log(p,typeof  p);
    var query='SELECT * FROM poemlist';
    connection.query(query,function(err,result){
        console.log("select",err,result);
        res.json(result);
    });
});

app.get('/commentpoem/:id/:text',function(req,res){
    var p =req.params.id;
    var t =req.params.text;
    console.log(p,typeof  p);
    console.log(t,typeof  t);
    var query='insert into comments (commenttext,poemid) values ("'+ t +'",' + p + ')';
    console.log("query",query);
    connection.query(query,function(err,result){
            res.json(result);
        });
});

app.get('/showcomment/:id/:text',function(req,res){
    var p =req.params.id;
    var t =req.params.text;
    console.log(p,typeof  p);
    var query='select commenttext from comments where poemid=' + p + '';
    console.log("query",query);
    connection.query(query,function(err,result){
        res.json(result);
    });
});



app.get('/loginpoem/:email/:password',function(req,res){
    var p =req.params.password;
    var e =req.params.email;
    var query='select email,password from login where email='+ e +' & password='+ p +'';
    console.log("query",query);
    connection.query(query,function(err,result){
        res.json(result);
    });
});

app.get('/likepoem/:id/:like',function(req,res){
    var p =req.params.id;
    var l= req.params.like;
    console.log(p,typeof  p);
    var query='UPDATE poemlist SET like='+ l +' where id='+ p +'';
    connection.query(query,function(err,result){
        console.log("select",err,result);
        res.json(result);
    });
});

app.get('/unlikepoem/:id/:unlike',function(req,res){
    var p =req.params.id;
    var l= req.params.unlike;
    console.log(p,typeof  p);
    var query='UPDATE poemlist SET like='+ l +' where id='+ p +'';
    connection.query(query,function(err,result){
        console.log("select",err,result);
        res.json(result);
    });
});

/*app.get('/nodetube', function (req, res) {
    request('https://news.ycombinator.com', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var parsedResults = [];
            $('span.comhead').each(function(){

                var a = $(this).prev();

                var rank = a.parent().parent().text();

                var title = a.text();

                var url = a.attr('href');

                var subtext = a.parent().parent().next().children('.subtext').children();

                var points = $(subtext).eq(0).text();
                var username = $(subtext).eq(1).text();
                var comments = $(subtext).eq(2).text();
                // Our parsed meta data object
                var metadata = {
                    rank: parseInt(rank),
                    title: title,
                    url: url,
                    points: parseInt(points),
                    username: username,
                    comments: parseInt(comments)
                };
                // Push meta-data into parsedResults array
                parsedResults.push(metadata);
            });
            // Log our finished parse results in the terminal
            console.log(parsedResults);
            var result = JSON.stringify(parsedResults);
            res.json(parsedResults);
        }
    });
});*/

app.get('/nodetube', function (req, res) {
    request('http://techmeme.com', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var parsedResults = [];
            $('div.ii').each(function(){

                var a = $(this).children();

                var rank = a.parent().parent().text();

                var title = a.text();

                var url = a.attr('href');

                var subtext = a.parent().parent().next().children('.subtext').children();

                var points = $(subtext).eq(0).text();
                var username = $(subtext).eq(1).text();
                var comments = $(subtext).eq(2).text();

                var metadata = {
                    rank: parseInt(rank),
                    title: title,
                    url: url,
                    points: parseInt(points),
                    username: username,
                    comments: parseInt(comments)
                };

                parsedResults.push(metadata);
            });

            console.log(parsedResults);
            var result = JSON.stringify(parsedResults);
            res.json(parsedResults);
        }
    });
});


require('./lib/controllers/dashBoardController.js')(app);
require('./lib/controllers/runJobController.js')(app);
require('./lib/controllers/poemController.js')(app);
require('./lib/controllers/orgtableController.js')(app);
require('./lib/controllers/loginController.js')(app);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
//exports = module.exports = app;
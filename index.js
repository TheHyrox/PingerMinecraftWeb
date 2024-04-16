#!/usr/bin/env node
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;
var ms = require('minestat');

app.get("/", function(req, res){
    res.render("home");
});

app.get("/ping/:address/:port", function(req, res){
    var address = req.params.address;
    var port = parseInt(req.params.port);

    ms.initSync({address: address, port: port}, function(error, result)
    {
        if(error)
        {
            res.status(404).json({ online: false });
        }
        else
        {
            res.status(200).json({ online: result.online });
        }
    });
});

app.get("/status/:address/:port", function(req, res){
    var address = req.params.address;
    var port = parseInt(req.params.port);

    ms.initSync({address: address, port: port}, function(error, result)
    {
        if(error)
        {
            res.render("status", { online: false });
        }
        else
        {
            res.render("status", { online: result.online });
        }
    });
});

app.listen(port, function(){
     console.log("server is running on port" + port);
});

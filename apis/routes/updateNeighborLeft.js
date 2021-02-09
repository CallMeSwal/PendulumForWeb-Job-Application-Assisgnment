const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const router = express.Router();

router.get('/', (req, res, next) => {
    if(req.app.pendulum.left){
        //res.status(400).json({"message":req.app.pendulum.left, "id":req.app.pendulum.id});
        var http = new XMLHttpRequest();
        http.responseType = 'json';
        http.open("get", "http://127.0.0.1:811"+req.app.pendulum.left.id+"/?length&mass");
        http.onerror = function () {
            console.log("Not able to access: http://127.0.0.1:811"+req.app.pendulum.left.id+"/?length&mass");
        };
        http.send();
        http.onload = () => {
            data=JSON.parse(http.responseText);
            req.app.pendulum.left.mass=data["mass"];
            req.app.pendulum.left.length=data["length"];
            res.status(200).json({"message":req.app.pendulum.left});
        };
    }
    else{
        res.status(400).json({"message":"Left neighbor not defined"});
    }
});

router.post('/setValue', (req, res, next) => {
    if(req.app.pendulum.left){
        req.app.pendulum.left.mass=req.query.mass;344
        req.app.pendulum.left.length=req.query.length;
        res.status(201).json({"message":"Left neighbor successfully defined"});
    }
    else{
        res.status(400).json({"message":"Left neighbor not defined"});
    }
});

module.exports = router;
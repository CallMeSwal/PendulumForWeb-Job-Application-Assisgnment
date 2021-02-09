const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const router = express.Router();

router.get('/', (req, res, next) => {
    if(req.app.pendulum.right){
        var http = new XMLHttpRequest();
        http.responseType = 'json';
        console.log("hiiii", "http://127.0.0.1:811"+req.app.pendulum.right.id+"/?length&mass");
        http.open("get", "http://127.0.0.1:811"+req.app.pendulum.right.id+"/?length&mass");
        http.onerror = function () {
            console.log("Not able to access: http://127.0.0.1:811"+req.app.pendulum.right.id+"/?length&mass");
        };
        http.send();
        http.onload = () => {
            data=JSON.parse(http.responseText);
            req.app.pendulum.right.mass=data["mass"];
            req.app.pendulum.right.length=data["length"];
            res.status(200).json({"message":req.app.pendulum.right});
        };
    }
    else{
        res.status(400).json({"message":"right neighbor not defined"});
    }
});

router.post('/setValue', (req, res, next) => {
    if(req.app.pendulum.right){
        req.app.pendulum.right.mass=req.query.mass;
        req.app.pendulum.right.length=req.query.length;
        res.status(201).json({"message":"right neighbor successfully defined"});
    }
    else{
        res.status(400).json({"message":"right neighbor not defined"});
    }
});

module.exports = router;
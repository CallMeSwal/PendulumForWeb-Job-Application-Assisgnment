const express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const router = express.Router();

function updateNeighborLeft(id){
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("get", "http://127.0.0.1:811"+id+"/updateNeighborLeft");
    http.onerror = function (error) {
        console.log("hello Not able to access: http://http://127.0.0.1:811"+id+"/updateNeighborLeft");
        setTimeout(function () {updateNeighborLeft(id)}, 2000);
    };
    http.send();
    http.onload = () => {
    };
}
function updateNeighborRight(id){
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("get", "http://http://127.0.0.1:811"+id+"/updateNeighborRight");
    http.onerror = function () {
        console.log("hello Not able to access: http://http://127.0.0.1:811"+id+"/updateNeighborRight");
        setTimeout(function () {updateNeighborRight(id)}, 2000);
    };
    http.send();
    http.onload = () => {
    };
}

router.get('/', (req, res, next) => {
    var output = {}
    if ("id" in req.query){
        output["id"]=req.app.pendulum.id;
    }
    if ("gravity" in req.query){
        output["gravity"]=req.app.pendulum.g;
    }
    if ("wind" in req.query){
        output["wind"]=req.app.pendulum.wind;
    }if (output != {}){
        res.status(200).json(output);
    }
    else{
        output["id"]=req.app.pendulum.id;
        output["wind"]=req.app.pendulum.wind;
        output["gravity"]=req.app.pendulum.g;
        res.status(200).json(output);
    }
});

router.post('/', (req, res, next) => {
    //res.status(201);
    // if ("id" in req.query){
    //     if([1, 2, 3, 4, 5].includes(req.query.id)){
    //         req.app.pendulum.id=req.query.id;
    //     }
    //     else{
    //         res.status(400).json({message:"ID not valid."});
    //     }
    // }
    var updateNeighbors=false;
    if ("wind" in req.query){
        if(req.query.wind <= req.app.pendulum.maxWind && req.query.wind >= req.app.pendulum.minWind || req.query.wind==0){
            req.app.pendulum.wind=req.query.wind;
        }
        else{
            res.status(400).json({message:"Wind outside limits."});
        }
    }
    if ("gravity" in req.query){
        if(req.query.gravity <= req.app.pendulum.maxG && req.query.gravity >= req.app.pendulum.minG){
            req.app.pendulum.g=req.query.gravity;
        }
        else{
            res.status(400).json({message:"Gravity outside limits."});
        }
    }
    res.status(201).json({message:req.app.pendulum.wind});
});

module.exports = router;
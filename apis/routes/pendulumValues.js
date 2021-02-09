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
    if ("mass" in req.query){
        output["mass"]=req.app.pendulum.mass;
    }
    if ("length" in req.query){
        output["length"]=req.app.pendulum.length;
    }
    if ("theta" in req.query){
        output["theta"]=req.app.pendulum.theta;
    }
    if ("b" in req.query){
        output["b"]=req.app.pendulum.b;
    }
    if ("x" in req.query){
        output["x"]=req.app.pendulum.x;
    }
    if ("y" in req.query){
        output["y"]=req.app.pendulum.y;
    }
    if (output != {}){
        res.status(200).json(output);
    }
    else{
        output["id"]=req.app.pendulum.id;
        output["mass"]=req.app.pendulum.mass;
        output["length"]=req.app.pendulum.length;
        output["theta"]=req.app.pendulum.theta;
        output["b"]=req.app.pendulum.b;
        output["x"]=req.app.pendulum.x;
        output["y"]=req.app.pendulum.y;
        res.status(200).json(output);
    }
});

router.get('/start', (req, res, next) => {
    req.app.pendulum.running=true;
    res.status(200).json({message:"success"});
});

router.get('/stop', (req, res, next) => {
    req.app.pendulum.running=false;
    req.app.pendulum.angVel=0.0;
    req.app.pendulum.angAcc=0.0;
    res.status(200).json({message:"success"});
});

router.get('/freeze', (req, res, next) => {
    req.app.pendulum.running=false;
    res.status(200).json({message:"success"});
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
    if ("mass" in req.query){
        if(req.query.mass <= req.app.pendulum.maxMass && req.query.mass >= req.app.pendulum.minMass){
            if((!req.app.pendulum.left || req.query.mass!=req.app.pendulum.left.mass) && (!req.app.pendulum.right || req.query.mass!=req.app.pendulum.right.mass)){
                req.app.pendulum.mass=req.query.mass;
                updateNeighbors=true;
            }
            else{
                res.status(400).json({message:"Mass equal to neighbor."});
            }
        }
        else{
            res.status(400).json({message:"Mass outside limits."});
        }
    }
    if ("length" in req.query){
        if(req.query.length <= req.app.pendulum.maxLength && req.query.length >= req.app.pendulum.minLength){
            if((!req.app.pendulum.left || req.query.length!=req.app.pendulum.left.length) && (!req.app.pendulum.right || req.query.length!=req.app.pendulum.right.length)){
                req.app.pendulum.length=req.query.length;
                updateNeighbors=true;
            }
            else{
                res.status(400).json({message:"Length equal to neighbor."});
            }
        }
        else{
            res.status(400).json({message:"Length outside limits."});
        }
    }
    if ("theta" in req.query){
        if(req.query.theta <= req.app.pendulum.maxTheta && req.query.theta >= req.app.pendulum.minTheta){
            req.app.pendulum.theta=req.query.theta;
        }
        else{
            res.status(400).json({message:"Theta outside limits."});
        }
    }
    if ("b" in req.query){
        if(req.query.b <= req.app.pendulum.maxB && req.query.b >= req.app.pendulum.minB){
            req.app.pendulum.b=req.query.b;
        }
        else{
            res.status(400).json({message:"Damping factor outside limits."});
        }
    }
    if (updateNeighbors){
        console.log("hi left");
        setTimeout(function () {updateNeighborRight(1)}, 2000);
        setTimeout(function () {updateNeighborLeft(2)}, 2000);
        setTimeout(function () {updateNeighborRight(2)}, 2000);
        setTimeout(function () {updateNeighborLeft(3)}, 2000);
        setTimeout(function () {updateNeighborRight(3)}, 2000);
        setTimeout(function () {updateNeighborLeft(4)}, 2000);
        setTimeout(function () {updateNeighborRight(4)}, 2000);
        setTimeout(function () {updateNeighborLeft(5)}, 2000);
        if(req.app.pendulum.left!=null){
            setTimeout(function () {updateNeighborLeft(req.app.pendulum.left.id)}, 2000);
        }
        if(req.app.pendulum.right!=null){
            setTimeout(function () {updateNeighborRight(req.app.pendulum.right.id)}, 2000);
        }
        updateNeighbors=false;
    }

    res.status(201).json({message:"success"});
});

module.exports = router;
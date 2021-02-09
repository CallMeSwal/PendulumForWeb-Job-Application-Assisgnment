const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mqtt = require('mqtt');

const Pendulum = require("./pendulum");
const updateValues = require("../apis/routes/pendulumValues.js");
const updateNeighborLeft = require("../apis/routes/updateNeighborLeft.js");
const updateNeighborRight = require("../apis/routes/updateNeighborRight.js");
const envValues = require("../apis/routes/envValues.js");

var jsonParser = bodyParser.json();

module.exports = function (id, mass, length, theta){
    var server = new express();
    server.pendulum = new Pendulum(id, mass, length, theta)
    /*
    console.log("eyy0");
    var client  = mqtt.connect("broker.hivemq.com:8000", {clientId:"swaleh"});
    console.log("eyy1", client);
    client.on('connect', () => {
        // Inform controllers that garage is connected
        console.log("eyy2");
    })
    client.subscribe("SET09603");
    console.log("eyy3");
    client.on('message',function(topic, message, packet){
        console.log("message is "+ message);
        console.log("topic is "+ topic);
    });
    console.log("eyy4");*/
    
    //setting up error logging
    server.use(morgan("dev"));

    
    //CORS Handling
    server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    // Routes which should handle requests
    server.use("/", updateValues);
    server.use("/updateNeighborLeft", updateNeighborLeft);
    server.use("/updateNeighborRight", updateNeighborRight);
    server.use("/envValues", envValues);

    server.use((req, res, next) => {
        const error = new Error("Not found");
        error.status = 404;
        next(error);
      });
    
    server.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
            message: error.message
            }
        });
    });

    //setInterval for updating XY values every 50ms
    var timestep=50;
    setInterval(function(){
        server.pendulum.updatePos(timestep/1000);
    }, timestep);

    return server;
}
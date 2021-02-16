//launches 5 pendulum instances and main UI sever
const exec = require('child_process').exec;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//launch ui
const ui = exec('nodemon ./services/launchFrontEnd.js');
ui.stdout.on('data', function (data) {
    console.log('ui - data: ' + data);
});
ui.on('error', function(err) {
    console.log('ui - error: ' + err);
});

//launch pendulum servers as child processes
const pendulumServer1 = exec('nodemon ./services/launchPendulumServer.js 8111 1 0.5 0.5 0.75');
pendulumServer1.stdout.on('data', function (data) {
    //console.log('pendulumServer1 - data: ' + data);
});
pendulumServer1.on('error', function(err) {
    //console.log('pendulumServer1 - error: ' + err);
});

const pendulumServer2 = exec('nodemon ./services/launchPendulumServer.js 8112 2 0.6 0.6 0.75');
pendulumServer2.stdout.on('data', function (data) {
    //console.log('pendulumServer2 - data: ' + data);
});
pendulumServer2.on('error', function(err) {
    //console.log('pendulumServer2 - error: ' + err);
});

const pendulumServer3 = exec('nodemon ./services/launchPendulumServer.js 8113 3 0.7 0.7 0.75');
pendulumServer3.stdout.on('data', function (data) {
    //console.log('pendulumServer3 - data: ' + data);
});
pendulumServer3.on('error', function(err) {
    //console.log('pendulumServer3 - error: ' + err);
});

const pendulumServer4 = exec('nodemon ./services/launchPendulumServer.js 8114 4 0.8 0.8 0.75');
pendulumServer4.stdout.on('data', function (data) {
    //console.log('pendulumServer4 - data: ' + data);
});
pendulumServer4.on('error', function(err) {
    //console.log('pendulumServer4 - error: ' + err);
});

const pendulumServer5 = exec('nodemon ./services/launchPendulumServer.js 8115 5 0.9 0.9 0.75');
pendulumServer5.stdout.on('data', function (data) {
    //console.log('pendulumServer5 - data: ' + data);
});
pendulumServer5.on('error', function(err) {
    //console.log('pendulumServer5 - error: ' + err);
});

function updateNeighborLeft(id){
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("get", "http://localhost:811"+id+"/updateNeighborLeft");
    http.onerror = function (error) {
        console.log("Not able to access: http://localhost:811"+id+"/updateNeighborLeft");
        setTimeout(function () {updateNeighborLeft(id)}, 2000);
    };
    http.send();
    http.onload = () => {
    };
}
function updateNeighborRight(id){
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("get", "http://localhost:811"+id+"/updateNeighborRight");
    http.onerror = function () {
        console.log("Not able to access: http://localhost:811"+id+"/updateNeighborRight");
        setTimeout(function () {updateNeighborRight(id)}, 2000);
    };
    http.send();
    http.onload = () => {
    };
}

//set neighbors
setTimeout(function () {updateNeighborRight(1)}, 2000);
setTimeout(function () {updateNeighborLeft(2)}, 2000);
setTimeout(function () {updateNeighborRight(2)}, 2000);
setTimeout(function () {updateNeighborLeft(3)}, 2000);
setTimeout(function () {updateNeighborRight(3)}, 2000);
setTimeout(function () {updateNeighborLeft(4)}, 2000);
setTimeout(function () {updateNeighborRight(4)}, 2000);
setTimeout(function () {updateNeighborLeft(5)}, 2000);

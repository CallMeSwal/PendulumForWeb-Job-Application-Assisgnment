const express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//const http = require('http');
const exec = require('child_process').exec;
const router = express.Router();

var prop = [[0.5, 0.5], [0.6, 0.6], [0.7, 0.7], [0.8, 0.8], [0.9, 0.9]];

router.get('/', (req, res, next) => {
    for(let i=1; i<=5; i++){
        const http = new XMLHttpRequest();
        http.responseType = 'json';
        //http.open("POST", "http://127.0.0.1:811"+i+"/?length="+prop[i-1][0]+"&mass="+prop[i-1][1]+"&theta=0.75");
        http.open("POST", "http://127.0.0.1:811"+i+"/?length="+prop[i-1][0]+"&mass="+prop[i-1][1]+"&theta=0.75");
        http.onerror = function () {
            console.log("Not able to access: ", url);
        };
        http.send();
        /*http.onload = () => {
            console.log("hii", http.response);
        };*/
    }
    for(let i=1; i<=5; i++){
        const http = new XMLHttpRequest();
        http.responseType = 'json';
        //http.open("POST", "http://127.0.0.1:811"+i+"/?length="+prop[i-1][0]+"&mass="+prop[i-1][1]+"&theta=0.75");
        http.open("POST", "http://localhost:811"+i+"/envValues/?wind=0&gravity=-9.81");
        http.onerror = function () {
            console.log("Not able to access: ", url);
        };
        http.send();
        /*http.onload = () => {
            console.log("hii", http.response);
        };*/
    }
    res.status(200).json({message:"success"});
});

module.exports = router;

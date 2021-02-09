const express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//const http = require('http');
const exec = require('child_process').exec;
const router = express.Router();

router.post('/', (req, res, next) => {
    req.app.pends = req.query.pends;
    res.status(201).json({message:"success"});
});

module.exports = router;

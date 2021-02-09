const express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//const http = require('http');
const exec = require('child_process').exec;
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json(JSON.parse(req.app.pends));
});

module.exports = router;

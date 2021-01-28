const server = require("express").Router();
const { Product } = require("../db");
const Sequelize = require("sequelize");
const fs = require('fs');       //File System - for file manipulation

server.post("/", (req, res, next) => {
    console.log("Peticion aceptada")
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        let dir = __dirname.replace("\\routes", "")
        console.log("Dir: ", dir)

        //Path where image will be uploaded
        fstream = fs.createWriteStream(dir + '/img/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {    
            console.log("Upload Finished of " + filename);              
            res.status(200).json({imagen: dir + '/img/' + filename})
        });
    });
});

server.get("/:name", (req, res) => {
    let dir = __dirname.replace("\\routes", "")
    fs.stat(dir + '/img/' + req.params.name, function(err, stat) {
        if(err == null) {
            console.log('File exists');
            res.sendFile(dir + '/img/' + req.params.name)
        } else if(err.code === 'ENOENT') {
            console.log('File not exists');
            res.status(404)
        } else {
            console.log('Some other error: ', err.code);
            res.status(500)
        }
    })
})

module.exports = server;
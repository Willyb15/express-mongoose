var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://localhost:27017/btb";
var connection = mongoose.connect(mongoUrl);
var Student = require('../models/students');

var multer = require('multer');
var fs = require('fs');
var upload = multer({
    dest: 'uploads/'
});
var type = upload.single('uploadedFile');

router.post('/uploads', type, function(req, res, next) {
    // res.json(req.file);
    var target_path = 'public/images/' + req.file.originalname;
    fs.readFile(req.file.path, function(error, data) {
        fs.writeFile(target_path, data, function(error) {
            if (error) {
                res.json('There was an error. ' + error);
            } else {
                res.json('Sucess!');
            }
        });
    });
});

/* GET home page. */
router.get('/students/:sortMethod', function(req, res, next) {

    var students = [];

    Student.find({}, function(error, document) {
        console.log(document);
        for (var i = 0; i < document.length; i++) {
            students.push(document[i].name);
        }
        console.log(students);


        if (req.params.sortMethod == "sort") {
            students.sort();
        } else if (req.params.sortMethod == "reverse") {
            students.sort();
            students.reverse();
        }
        res.json(students);
    });
});

module.exports = router;
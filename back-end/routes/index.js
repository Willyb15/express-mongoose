var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://localhost:27017/btb";
var connection = mongoose.connect(mongoUrl);
var Student = require('../models/students');

/* GET home page. */
router.get('/students/:sortMethod', function(req, res, next) {

	var students = [];

	Student.find({}, function(error, document){
		console.log(document);
		for(i=0;i<document.length; i++){
			students.push(document[i].name);
		}
	});

	if(req.params.sortMethod == "sort"){
		students.sort()	;
	}else if(req.params.sortMethod == "reverse"){
		students.sort()	;
	  	students.reverse();
  	}
  	res.json(students);
});

module.exports = router;

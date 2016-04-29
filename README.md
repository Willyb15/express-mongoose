# Express.js with Mongoose and Angular and Multer
###Installing Express.js, configuring Mongoose, using Angular.js as front-end
###Get Express configured in back-end folder
```
npm init
npm install express --save
express
npm install
```
###Created index.html with Angular
```html
<body ng-controller="studentController">

	<button class="btn btn-primary" ng-click="sortAlph()">Sort Alphabetically</button>
	<button class="btn btn-danger" ng-click="reverseSort()">Sort in Reverse</button>

	<li ng-repeat="student in studentList track by $index">
		{{student}}
	</li>
```
###Created controller.js file to define our functions and make $http get requests
```js
var studentApp = angular.module('studentApp', []);
studentApp.controller('studentController', function($scope, $http){
	//On load, run getStudentsFromApi and send it the studnets path
	getStudentsFromApi('/students/default');	
	//On click of the sort button, get the student list from the students path
	$scope.sortAlph = function(){
		getStudentsFromApi('/students/sort');	
	}
	//On click of the reverse button, get the student list from the studetns/reverse path
	$scope.reverseSort = function(){
		getStudentsFromApi('/students/reverse');
	}
	//the getStudents function that takes teh URL we are after
	function getStudentsFromApi(urlEnding){
		$http({method: 'GET', url: 'http://localhost:3050'+urlEnding}).then(
			function successCallback(response){
				$scope.studentList = response.data;
			}, function errorCallback(response){
				console.log(response);
				$scope.studentList = response;
			}
		);
	}
});
```
### Configuring our backend - configure Express and MongoDB in the index.js folder
```js
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://localhost:27017/btb";
var connection = mongoose.connect(mongoUrl);
var Student = require('../models/students');
```
####Now student is a module that can be exported and used. See below ex. Students.find()
###Then define our Route in index.js
```js
/* GET home page. */
router.get('/students/:sortMethod', function(req, res, next) {
	Student.find({}, function(error, document){
		console.log(document);
	});
	if(req.params.sortMethod == "sort"){
		students.sort()	
	}else if(req.params.sortMethod == "reverse"){
		students.sort()	
	  	students.reverse();
  	}
  	res.json(students);
});
module.exports = router;
```
###Created Models folder with students.js - Where we configure Mongoose
```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Student = new Schema({
	name: String,
	row: String
});
module.exports = mongoose.model('Student', Student);
```

##Added multer from npm to upload files
###In HTML added form tags
```html
	<form action="http://localhost:3050/uploads" method="post" enctype="multipart/form-data">
		<input type="file" name="uploadedFile">
		<input type="submit" class="btn btn-primary" value="Submit the file">
	</form>
```
###In console ran
```
npm install multer
```
###In index.js configured Multer
```js
var multer = require('multer');
var fs = require('fs');
var upload = multer({dest: 'uploads/'});
var type = upload.single('uploadedFile');

router.post('/uploads', type, function(req, res, next){
	// res.json(req.file);
	var target_path = 'public/images/' + req.file.originalname;
	fs.readFile(req.file.path, function(error, data){
		fs.writeFile(target_path, data, function(error){
			if(error){
				res.json('There was an error. ' + error);
			}else{
				res.json('Sucess!');
			}
		});
	});
});
```


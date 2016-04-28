# Express,js with Mongoose
###Getting Express.js and configuring mongoose
###Get Express configured
```
npm init
npm install express --save
express
npm install
```
###Put MongoDB into the index.js folder
```js
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://localhost:27017/btb";
var connection = mongoose.connect(mongoUrl);
var Student = require('../models/students');
```
###Created Models folder with students.js Where we configured Mongoose
```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Student = new Schema({
	name: String,
	row: String
});

module.exports = mongoose.model('Student', Student);
```

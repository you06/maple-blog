"use strict";
var mongoose = require('mongoose');
const path = require("path");

// connect to mongo
mongoose.connect('mongodb://localhost/maple');

var db = mongoose.connection;
db.on('error', console.error.bind(
    console, 'maple mongodb connection error:')
);
db.once( 'open', function () {
    console.log('connection to maple mongodb success.');

    var Schema = mongoose.Schema;

    var MapleSchema = new Schema({
        title : String,
        author: String,
        body  : String
    });

    // methods of maple
    MapleSchema.methods.findArticle = function (cb) {
        return this.model('maplemodels').find({ author: this.author }, cb);
    }

    // create model
    var mapleSchema = mongoose.model('maplemodels', MapleSchema);

    var articleModel = new mapleSchema({ author: 'Matt' });

    articleModel.findArticle(function (err, articles) {
        console.log(articles);
    });

});



// load configs.json
const configs = require("../configs.json");

// Located in the root directory of the project
const root = path.dirname(__dirname);

module.exports.path = {};
module.exports.path.static = path.join(root, "public");
module.exports.path.views = path.join(root, "view");

// jwt settings
// module.exports.jwt = configs.jwt;

// port
module.exports.app = configs.app;

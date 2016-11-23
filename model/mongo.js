"use strict";
var mongoose = require('mongoose');
// connect to mongo
mongoose.connect('mongodb://localhost/maple');

var db = mongoose.connection;
db.on('error', console.error.bind(
    console, 'maple mongodb connection error:')
);

db.once( 'open', function () {
    // log the notice
    console.log('connection to maple mongodb success.');

    var Schema = mongoose.Schema;

    var mapleSchema = new Schema({
        title : String,
        abstract: String,
        nick  : String,
        author: String,
        trans : String,
        feed  : String,
        tags  : [String],
        time  : Date,
        view  : Number,
        hidden: Boolean
    });

    // create methods of MapleSchema
    mapleSchema.methods.findArticle = function (page, pageSize, callback) {
        return this.model('maple').find({ author: this.tag }, callback);
    }
    mapleSchema.methods.findArticleByNick = function (callback) {
        return this.model('maple').findOne({ author: this.nick }, callback);
    }
    mapleSchema.methods.findArticleByTag = function (callback) {
        return this.model('maple').find({ author: this.tag }, callback);
    }
    mapleSchema.methods.findArticleByDate = function (callback) {
        // return this.model('maple').find({ time: this.time }, callback);
    }
    mapleSchema.methods.showBody = function () {
        console.log(this.body);
    }
    mapleSchema.methods.test = function () {
        console.log('this is test method @ mapleSchema');
    }

    // create model of MapleSchema
    var mapleModel = mongoose.model('maple', mapleSchema);

    // don't care about the insert problem
    // var articleInsert = new mapleModel({
    //     title : 'insertByNode',
    //     nick  : 'insert-by-node',
    //     author: 'Matt',
    //     trans : '',
    //     feed  : '',
    //     tags  : ['game', 'node'],
    //     time  : new Date().getTime(),
    //     view  : 1,
    //     hidden: false
    // });
    //
    // articleInsert.save(function (err, article) {
    //     if (err) return console.error(err);
    //     article.showBody();
    // });

    module.exports.mapleModel = mapleModel;
});
"use strict";
var xtpl = require('xtpl');
var fs = require('fs');
var markdown = require('markdown').markdown;
const configs = require('../configs/configs.js');
const mongo = require('../model/mongo.js');

module.exports.index = function* index (next) {
    var homePageAmount = 3;

    var mapleEntity = new mongo.mapleModel({
        title : 'this is entity',
        abstract: '',
        nick  : 'this-is-entity',
        author: 'Matt@node',
        trans : '',
        feed  : '',
        tags  : ['game', 'anime', 'note'],
        time  : new Date(),
        view  : 123,
        hidden: false
    });

    mapleEntity.test();

    var query = mongo.mapleModel.find({hidden: false});

    var resBody = '';

    yield query.sort({'date': -1}).limit(homePageAmount).lean().exec(function (err, docs) {
        docs.forEach(function (item, arrayIndex) {
            var itemDate = new Date(item['time']);
            docs[arrayIndex]['year'] = itemDate.getFullYear();
            docs[arrayIndex]['month'] = itemDate.getMonth() + 1;
            docs[arrayIndex]['day'] = itemDate.getDate();
        });

        console.log(docs);

        xtpl.renderFile(
            configs.path.views + '/index.xtpl',
            {
                PUBLIC: '/public',
                articles: docs
            },
            function(error,content){
                if (error) {
                    resBody = error;
                    console.log('[ERROR]', error);
                }
                else {
                    resBody = content;
                    return index();
                }
            }
        );
    });

    for (var i = 0; i < homePageAmount; i++) {
        yield new Object();
    }

    this.body = resBody;
}

function* loadData() {

}

module.exports.article = function* article(next) {

}
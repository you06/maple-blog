"use strict";
var xtpl = require('xtpl');
var fs = require('fs');
var markdown = require('markdown').markdown;
const configs = require('../configs/configs.js');

module.exports.index = function* index (next) {
    var resBody = '';

    xtpl.renderFile(
        configs.path.views + '/index.xtpl',
        {
            PUBLIC: '/public',
            articles: 'docs'
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

    this.body = resBody;
}

function* loadData() {

}

module.exports.article = function* article(next) {

}
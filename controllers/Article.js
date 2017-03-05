"use strict";
const xtpl = require('xtpl');
const fs = require('fs');
const path = require('path');
const Prism = require('prismjs');
var marked = require('marked');
const hljs = require('highlight.js');
const configs = require('../configs/configs.js');

marked.setOptions({
  highlight: function (code, lan) {
    return Prism.highlight(code, Prism.languages['lan'] || Prism.languages.javascript);
    // return hljs.highlightAuto(code).value;
  }
});

var articleTreeDict = {};
var articleTree = [];

articleInit();

function articleInit() {
    let promise = new Promise(function(resolve, reject) {
        fs.readFile(path.join(configs.path.upload, '/tree/tree.json'), 'utf-8', function(err, data) {
            if (err) {
                console.log('error occur!');
                reject(err.Error);
            } else {
                resolve(data);
            }
        });
    });

    promise.then(function(value) {
        let articleTreeOrigin = JSON.parse(value);
        articleTree = JSON.parse(value);
        // 以后再来错误处理 TuT
        articleTreeOrigin.forEach(function(item, index) {
            articleTreeDict[item['page']] = item;
        });
        articleTree.forEach(function(item, index) {
            delete item['file'];
        });
        articleTree.sort(function(a, b){
            if (a > b) {
                return false;
            } else {
                return true;
            }
        });
    }, function(error) {
        console.log(error);
        console.log('[ERROR]', error);
    });
}

module.exports.reload = articleInit;

module.exports.enum = function* index (next) {
    this.body = JSON.stringify(articleTree);
}

module.exports.getArticleInfo = function* articleInfo(next) {
    let self = this;
    if (this.params['id']) {
        let articleId = this.params['id'];
        if(!articleTreeDict[articleId]) {
            self.body = '404 NOT FOUND';
        } else {
            self.body = {
                title: articleTreeDict[articleId]['title'],
                time: articleTreeDict[articleId]['time'],
                tags: articleTreeDict[articleId]['tags']
            };
        }
    } else {
        self.body = '401 BAD REQUEST';
    }

}

module.exports.getArticle = function* article(next) {
    let self = this;
    if (this.params['id']) {
        let articleId = this.params['id'];
        if(!articleTreeDict[articleId]) {
            self.body = '404 NOT FOUND';
        } else {
            let promise = yield new Promise(function(resolve, reject) {
                console.log(path.join(configs.path.upload, '/markdown/' + articleTreeDict[articleId]['file']));
                fs.readFile(path.join(configs.path.upload, '/markdown/' + articleTreeDict[articleId]['file']), 'utf-8', function(err, data) {
                    if (err) {
                        console.log('[ERROR]', err.message);
                        reject(err.Error);
                    } else {
                        resolve(data);
                    }
                });
            });

            self.body = marked(promise);
        }
    } else {
        self.body = '401 BAD REQUEST';
    }

}

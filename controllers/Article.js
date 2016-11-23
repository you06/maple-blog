"use strict";
const xtpl = require('xtpl');
const fs = require('fs');
const path = require('path');
const markdown = require('markdown').markdown;
const configs = require('../configs/configs.js');

module.exports.enum = function* index (next) {
    this.body = '';
}
var count = 1;
var lastCount = count;
module.exports.getArticle = function* article(next) {
    let self = this;

    let promise = new Promise(function(resolve, reject) {
        console.log('start article promise['+count+']');
        lastCount = count;
        count++;

        var data = fs.readFileSync(path.join(configs.path.upload, '/markdown/2016-11-24-hello-world.md'), 'utf-8');
        if (data) {
            resolve(data);
        }
        
        // fs.readFile(path.join(configs.path.upload, '/markdown/2016-11-24-hello-world.md'), 'utf-8', function(err, data) {
        //     console.log(err, data);
        //     if (err) {
        //         console.log('error occur!');
        //         reject(err.Error);
        //     } else {
        //         console.log('end promise['+count+']');
        //         resolve('data');
        //     }
        // });
    });

    promise.then(function(value) {
        console.log('end article promise['+lastCount+']');
        self.body = markdown.toHTML(value);
    }, function(error) {
        self.body = error;
        console.log('------');
        console.log('[ERROR]', error);
    });

}
"use strict";
const xtpl = require('xtpl');
const path = require('path');
const markdown = require('markdown').markdown;
const configs = require('../configs/configs.js');

module.exports.index = function* index (next) {
    let self = this

    let promise = new Promise(function(resolve, reject) {
        xtpl.renderFile(
            path.join(configs.path.views + '/index.xtpl'),
            {
                PUBLIC: '/public',
                articles: 'docs'
            },
            function(error, content){
                if (error) {
                    reject(error);
                }
                else {
                    resolve(content)
                }
            }
        );
    });

    promise.then(function(value) {
        self.body = value;
    }, function(error) {
        self.body = error;
        console.log('[ERROR]', error);
    });
}
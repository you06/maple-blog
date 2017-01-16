"use strict";
const session = require('koa-session');
const xtpl = require('xtpl');
const fs = require('fs');
const path = require('path');
const configs = require('../configs/configs.js');
const coBody = require('co-body');
const sha256 = require('sha256');

var userList = [];

userInit();

function userInit() {
    let promise = new Promise(function(resolve, reject) {
        fs.readFile(path.join(configs.path.root, 'user.json'), 'utf-8', function(err, data) {
            if (err) {
                console.log('error occur!');
                reject(err.Error);
            } else {
                resolve(data);
            }
        });
    });

    promise.then(function(value) {
        userList = JSON.parse(value);
        // 以后再来错误处理 TuT
        userList.forEach(function(item, index) {
            let username = item.username;
            let password = item.password;
            userList[index] = {
                username: sha256(username),
                password: sha256(sha256(password) + 'Maple' + username)
            };
        });
    }, function(error) {
        console.log(error);
        console.log('[ERROR]', error);
    });
}

module.exports.index = function* index (next) {
    let self = this;

    let promise = new Promise(function(resolve, reject) {
        xtpl.renderFile(
            path.join(configs.path.views + '/login.xtpl'),
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

module.exports.login = function* login (next) {
    let post = yield coBody.form(this);
    let pass = false;
    if (post.username && post.password) {
        userList.forEach(function(item, index) {
            if (item.username === post.username && item.password === post.password) {
                pass = true;
            }
        });
    }

    if (pass) {
        this.cookies.set('maple', 'pass');
        this.body = {
            status: true,
            msg: 'OK'
        }
    } else {
        this.body = {
            status: false,
            msg: 'QAQ'
        }
    }
}

module.exports.admin = function* admin (next) {
    if (!checkLogin(this.cookies.get('maple'))) {
        this.status = 401;
        this.body = 'login ლ(ﾟдﾟლ)';
    } else {
        let self = this;

        let promise = new Promise(function(resolve, reject) {
            xtpl.renderFile(
                path.join(configs.path.views + '/admin.xtpl'),
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
}

function checkLogin(cookieMaple) {
    if (cookieMaple && 'pass' === cookieMaple) {
        return true;
    } else {
        return false;
    }
}
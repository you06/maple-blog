"use strict";
const os = require('os');
const session = require('koa-session');
const xtpl = require('xtpl');
const fs = require('fs');
const path = require('path');
const configs = require('../configs/configs.js');
const coBody = require('co-body');
const sha256 = require('sha256');
const co = require('co');
const oss = require('ali-oss');
const parse = require('co-busboy');
const Article = require('./Article')

var userList = [];
var client = new oss(configs.ossConfigs);
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

module.exports.new = function* newArticle(next) {
    if (!checkLogin(this.cookies.get('maple'))) {
        this.status = 401;
        this.body = 'login ლ(ﾟдﾟლ)';
    } else {
        let self = this;
        let post = yield coBody.form(this);
        if (post.title && post.page) {
            let articleTree = yield new Promise(function(resolve, reject) {
                fs.readFile(path.join(configs.path.upload, '/tree/tree.json'), 'utf-8', function(err, data) {
                    if (err) {
                        console.log('error occur!');
                        reject(err.Error);
                    } else {
                        console.log(data)
                        resolve(data);
                    }
                });
            });
            articleTree = JSON.parse(articleTree);
            // 以后再来错误处理 TuT
            let currentTime = new Date();
            let filename = currentTime.getFullYear() + '-' 
                + (currentTime.getMonth() + 1) + '-'
                + currentTime.getDate() + '-'
                + post.page + '.md';
            let writeFilePromise = yield new Promise(function(resolve, reject) {
                fs.writeFile(path.join(configs.path.upload, '/markdown/', filename), post.data, function(err, data) {
                    let articleLeaf = {
                        title: post.title,
                        time: currentTime.getTime(),
                        'last-update': currentTime.getTime(),
                        page: post.page,
                        preview: post.preview,
                        tags: post.tags || ['闲聊'],
                        file: filename
                    }
                    articleTree.push(articleLeaf);
                    fs.writeFile(path.join(configs.path.upload, '/tree/tree.json'), JSON.stringify(articleTree), function() {
                        resolve(true)
                    })
                })
            });

            if (true === writeFilePromise) {
                self.body = {
                    status: true,
                    msg: 'ok'
                }
                Article.reload()
            }
        }
    }
}

module.exports.update = function* updateArticle(next) {
    this.body = 'update';
}

module.exports.uploadImage = function* uploadImage(next) {
    if (!checkLogin(this.cookies.get('maple'))) {
        this.status = 401;
        this.body = 'login ლ(ﾟдﾟლ)';
    } else {
        let self = this;
        let parts = parse(this);
        let getSuffix = /\.([a-zA-Z0-9]*)$/i;
        var part;
        
        while ((part = yield parts)) {
            if (part && part.filename) {
                var suffix = getSuffix.exec(part.filename)[1];
            }
            var filename = sha256(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()
                + Math.random().toString()).substr(10,16)+ '.' + suffix
            var stream = fs.createWriteStream(path.join(os.tmpdir(), filename));
            part.pipe(stream);
            // console.log('uploading %s -> %s', part.filename, stream.path);
        }
        
        try {
            client.useBucket('maple-blog');
            let result = yield client.put('/article/image/' + filename, stream.path);
            let imageUrl = result.res.requestUrls[0].replace('http://', 'https://');
            self.body = {
                status: true,
                url: imageUrl
            }
        }
        catch (error) {
            self.status = 500;
            self.body = error.msg;
        }
    }
}

function checkLogin(cookieMaple) {
    if (cookieMaple && 'pass' === cookieMaple) {
        return true;
    } else {
        return false;
    }
}
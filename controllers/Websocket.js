"use strict";
var xtpl = require('xtpl');
var fs = require('fs');
var markdown = require('markdown').markdown;
const configs = require('../configs/configs.js');

const io = new socket();
io.attach( app );
module.exports.index = function* index (next) {

    app._io.on( 'connection', sock => {
      // ... 
    });

}

function* loadData() {

}

module.exports.article = function* article(next) {

}
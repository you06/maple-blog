"use strict";
var xtpl = require('xtpl');
const configs = require('../configs/configs.js');


module.exports.index = function* index (next) {
    var resBody = '';
    xtpl.renderFile(
        configs.path.views + '/index.xtpl',
        {
            title: 'xtpl works',
            PUBLIC: '/public'
        },
        function(error,content){
            if (error) {
                resBody = error;
            }
            else {
                resBody = content;
            }
        }
    );
    this.body = resBody;

}



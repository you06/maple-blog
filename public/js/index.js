"use strict";

(function() {
    var mapleArticleTree = document.querySelector('#maple-article-tree');
    $.ajax({
        url: '/api/article',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
        mapleArticleTree.innerHTML = '';
        for (var i = 0; i < res.length; i++) {
            var time = new Date(res[i].time);
            var articleLeaf = [
            '<a class="maple-title" href="/article/' + res[i]['page'] + '">' + res[i]['title'] + '</a>',
            '<p class="maple-info">',
                '<span class="maple-datetime">',
                '<i class="fa fa-calendar" aria-hidden="true"></i>',
                '' + time.getFullYear() + '.' + (time.getMonth() + 1) + '.' + time.getDate(),
                '</span>',
                '<i class="fa fa-book" aria-hidden="true"></i>',
                '<span class="maple-tags">' + res[i].tags.join(' ') + '</span>',
            '</p>',
            '<p class="maple-preview">',
                res[i]['preview'],
            '</p>',
            '<hr class="maple-hr ' + ((i === res.length - 1) ? 'hidden' : '') + '">'
            ].join('');
            mapleArticleTree.innerHTML += articleLeaf;
        }
        stopDefActionInWrapper();
        }
    });
})()
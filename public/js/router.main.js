(function() {
  "use strict";
  var bodyWrapper = document.getElementById('body-wrapper');
  var loadingWrapper = document.getElementById('loading-wrapper');

  Router.route('/', function() {loadPage('/component/index.html', 'home');});
  Router.route('/index', function() {loadPage('/component/index.html', 'home');});
  Router.route('/index.html', function() {loadPage('/component/index.html', 'home');});
  Router.route('/article/:id', function() {loadPage('/component/article.html', 'article');});
  Router.route('/article/:id/', function() {loadPage('/component/article.html', 'article');});

  Router.route('404', function() {loadPage('/component/404.html', 'not-found-404')});

  var first = true;
  function loadPage(pageUri, pageTag) {
    console.log('[ROUTE] ' + pageUri + ' - ' + pageTag);
    // before load page
    if (!first) {
      Maple.closeBody(function () {
        loadingWrapper.classList.remove('hide');
        bodyWrapper.classList.add('hide');
        $('.sidebar li').removeClass('current');
        $('.sidebar li').each(function(index, item) {
          if (this.getAttribute('tag') === pageTag) this.classList.add('current');
        });
        $.ajax({
          url: pageUri,
          type: 'GET',
          dataType: 'html',
          success: function(res) {
            var parseScript = parseHTML(res);
            bodyWrapper.innerHTML = parseScript.htmlText;
            $('.follow-page').remove();
            setTimeout(function() {
              loadingWrapper.classList.add('hide');
              bodyWrapper.classList.remove('hide');
              setTimeout(function() {
                Maple.openBody(function() {
                  stopDefActionInWrapper();
                  parseScript.scriptTags.forEach(function(item) {
                    var createScript = $(item);
                    createScript.attr('class', 'follow-page');
                    $('head').append(createScript);
                  });
                })
              });
            }, 300);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            loadPage(pageUri, pageTag);
          }
        });
      });
    }
    else {
      first = false;
      loadingWrapper.classList.remove('hide');
      bodyWrapper.classList.add('hide');
      $('.sidebar li').removeClass('current');
      $('.sidebar li').each(function(index, item) {
        if (this.getAttribute('tag') === pageTag) this.classList.add('current');
      });
      $.ajax({
        url: pageUri,
        type: 'GET',
        dataType: 'html',
        success: function(res) {
          var parseScript = parseHTML(res);
          bodyWrapper.innerHTML = parseScript.htmlText;
          $('.follow-page').remove();
          setTimeout(function() {
            loadingWrapper.classList.add('hide');
            bodyWrapper.classList.remove('hide');
            setTimeout(function() {
              Maple.openBody(function() {
                stopDefActionInWrapper();
                parseScript.scriptTags.forEach(function(item) {
                  var createScript = $(item);
                  createScript.attr('class', 'follow-page');
                  $('head').append(createScript);
                });
              })
            });
          }, 300);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
          console.log(textStatus);
          loadPage(pageUri, pageTag);
        }
      });
    }
  }

  function parseHTML(htmlText) {
    // script tags should append to the DOM tree
    htmlText = htmlText.replace(/\r\n/g, '\n');
    var re = /<script.*>[\s\S]*<\/script>/g;
    var scriptTags = htmlText.match(re);
    htmlText = htmlText.replace(re, '');
    return {
      htmlText: htmlText,
      scriptTags: scriptTags ? scriptTags : []
    }
  }

  function stopDefAction(evt) {
    evt.preventDefault();
  }

  function stopDefActionInWrapper() {
    var aSet = document.querySelectorAll('#body-wrapper a');
    for (var i = 0 ; i < aSet.length; i++) {
      aSet[i].addEventListener( 'click', stopDefAction, false );
      aSet[i].addEventListener( 'click', function() {
        Router.jump(this.href);
      }, false );
    }
  }

})()
"use strict";

(function() {
  var maple = {};
  window.Maple = maple;
  var move = require('move');
  window._move = move;
  // fixed the retina display
  retinajs( document.querySelectorAll('img') );
  retinajs( document.getElementById('meta-favicon') );

  var headerListener = listenHeader();

  function closeBody(callback) {
    var mapleHeader = document.getElementById('maple-header'),
        mapleHeaderSmall = document.getElementById('maple-header-small'),
        mapleFooter = document.getElementById('maple-footer');

    var winHeight = 0;
    if (window.innerHeight) {
      winHeight = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
      winHeight = document.body.clientHeight;
    }

    var isHeaderSmall = false,
        isFooterIn = false;
    for (var item in mapleHeaderSmall.classList) {
      if (mapleHeaderSmall.classList.hasOwnProperty(item)) {
        if (mapleHeaderSmall.classList[item] === 'open-small-header') {
          isHeaderSmall = true;
        }
      }
    }

    if (window.scrollY + winHeight > mapleFooter.offsetTop) {
      isFooterIn = true;
    }

    if (isHeaderSmall) {
      $('#maple-footer-small-ani').css({
        visibility: 'visible',
        display: 'block'
      });
      $('#maple-header-small-ani').css({
        visibility: 'visible',
        display: 'block'
      });
      setTimeout(function() {
        move('#maple-header-small-ani')
          .set('height', winHeight / 2)
          .set('box-shadow', 'none')
          .set('border-bottom', 'none')
          .set('top', 0)
          .end();
        move('#maple-header-small-container-ani')
          .set('margin-top', parseInt(winHeight / 2 - $('#maple-header-small-container').height()))
          .end();
        move('#maple-footer-small-ani')
          .set('height', winHeight / 2 + 70)
          .set('box-shadow', 'none')
          .set('border-top', 'none')
          .end(function() {
            setTimeout(function() {
              $('#maple-footer-small-ani').css({
                visibility: 'visible',
                display: 'block'
              });
              $('#maple-header-small-ani').css({
                visibility: 'visible',
                display: 'block'
              });
              if (callback && 'function' === typeof callback) {
                callback();
              }
            });
          });
      });
    }
    else if (!isHeaderSmall) {
      $('#maple-header-small-ani').css('top', '-' + $('#maple-header-small-container').height());
      $('#maple-footer-small-ani').css({
        visibility: 'visible',
        display: 'block'
      });
      $('#maple-header-small-ani').css({
        visibility: 'visible',
        display: 'block'
      });
      setTimeout(function() {
        move('#maple-header-small-ani')
          .set('height', winHeight / 2)
          .set('box-shadow', 'none')
          .set('border-bottom', 'none')
          .set('top', 0)
          .end();
        move('#maple-header-small-container-ani')
          .set('margin-top', parseInt(winHeight / 2 - $('#maple-header-small-container').height()))
          .end();
        move('#maple-footer-small-ani')
          .set('height', winHeight / 2 + 70)
          .set('box-shadow', 'none')
          .set('border-top', 'none')
          .end(function() {
            setTimeout(function() {
              $('#maple-footer-small-ani').css({
                visibility: 'visible',
                display: 'block'
              });
              $('#maple-header-small-ani').css({
                visibility: 'visible',
                display: 'block'
              });
              if (callback && 'function' === typeof callback) {
                callback();
              }
            });
          });
      });
    }
  }

  function firstCloseBody(callback) {
    var winHeight = 0;
    if (window.innerHeight) {
      winHeight = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
      winHeight = document.body.clientHeight;
    }

    $('#maple-header-small-ani').css({
      height: winHeight / 2,
      'box-shadow': 'none',
      'border-bottom': 'none',
      top: 0,
      display: 'block',
      visibility: 'visible'
    });
    $('#maple-header-small-container-ani').css({
      'margin-top': parseInt(winHeight / 2 - $('#maple-header-small-container').height())
    });
    $('#maple-footer-small-ani').css({
      height: winHeight / 2 + 70,
      'box-shadow': 'none',
      'border-top': 'none',
      display: 'block',
      visibility: 'visible'
    });
  }

  function openBody(callback) {
    move('#maple-header-small-ani')
      .set('height', 70)
      .set('box-shadow', '#ddd 0px 3px 3px')
      .set('border-bottom', '1px 1solid #ddd')
      .set('top', -75)
      .end();
    move('#maple-header-small-container-ani')
      .set('margin-top', 0)
      .end();
    move('#maple-footer-small-ani')
      .set('height', 70)
      .set('box-shadow', '#ddd 0px -3px 3px')
      .set('border-top', '1px 1solid #ddd')
      .end(function() {
        $('#maple-footer-small-ani').css('visibility', 'hidden');
        setTimeout(function() {
          if (callback && 'function' === typeof callback) {
            callback();
          }
        });
      });
  }

  document.getElementById('maple-title').addEventListener('click', function() {
    Router.jump('/index');
  });
  document.getElementById('maple-header-small-logo').addEventListener('click', closeBody);
  document.getElementById('maple-header-small-logo-ani').addEventListener('click', openBody);
  maple.closeBody = closeBody;
  maple.openBody = openBody;

  function listenHeader() {
    var headerStatus = true;
    var isAnimate = false;
    var lastScrollY;

    function smallHeader() {
      isAnimate = true;
      headerStatus = false;
      var mapleHeader = document.getElementById('maple-header'),
          mapleHeaderSmall = document.getElementById('maple-header-small');
      mapleHeaderSmall.classList.remove('close-small-header');
      mapleHeaderSmall.classList.add('open-small-header');
      mapleHeaderSmall.classList.remove('hidden');
      mapleHeader.classList.add('close-full-header');
      mapleHeader.classList.remove('open-full-header');
      setTimeout(function() {
        isAnimate = false;
      }, 100);
    }

    function fullHeader() {
      isAnimate = true;
      headerStatus = true;
      var mapleHeader = document.getElementById('maple-header');
      var mapleHeaderSmall = document.getElementById('maple-header-small');
      mapleHeaderSmall.classList.remove('open-small-header');
      mapleHeaderSmall.classList.add('close-small-header');
      mapleHeaderSmall.classList.remove('hidden');
      mapleHeader.classList.add('open-full-header');
      mapleHeader.classList.remove('close-full-header');
      setTimeout(function() {
        isAnimate = false;
      }, 100);
    }

    return document.addEventListener('scroll', function(e) {
      var scrollDistance = window.scrollY - lastScrollY;
      if (!isAnimate && headerStatus && scrollDistance > 0 && window.scrollY > 280) {
        // small header
        smallHeader();
      } else if (!isAnimate && !headerStatus && scrollDistance < 0 && window.scrollY < 280) {
        // full height header
        fullHeader();
      }
      lastScrollY = window.scrollY;
    });
  }

  function scollTo(x, y, time, callback, FPS) {
    FPS = FPS || 60;

    var totalStep = FPS * time,
        currentStep = 1;

    var xStart = window.scrollX,
        yStart = window.scrollY,
        xDistance = x - xStart,
        yDistance = y - yStart,
        xStep = xDistance / totalStep,
        yStep = yDistance / totalStep;

    var scrollEvent = setInterval(function() {
      xStart += xStep;
      yStart += yStep;
      window.scrollTo(xStart, yStart);
      currentStep++;
      if(currentStep >= totalStep) {
        clearInterval(scrollEvent);
        if (callback) callback();
      }
    }, 1000 / FPS);
  }

  function getObjHeight(_$) {
    console.log(_$)
    var _$Height = 0;
    if ('none' === _$.css('display')) {
      _$.css({
        visibility: 'visible'
      });
      _$Height = _$.height();
    }
    return _$Height;
  }

})()
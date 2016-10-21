"use strict";

(function() {
  // fixed the retina display
  retinajs( document.querySelectorAll('img') );
  retinajs( document.getElementById('meta-favicon') );
  
  var headerListener = listenHeader();


  function closeBody() {
    var mapleHeader = document.getElementById('maple-header'),
        mapleHeaderSmall = document.getElementById('maple-header-small'),
        mapleFooter = document.getElementById('maple-footer');

    var isHeaderSmall = false,
        isFooterIn = false;
    for (var item in mapleHeaderSmall.classList) {
      if (mapleHeaderSmall.classList.hasOwnProperty(item)) {
        if (mapleHeaderSmall.classList[item] === 'open-small-header') {
          isHeaderSmall = true;
        }
      }
    }



    var winHeight = 0;
    if (window.innerHeight) {
      winHeight = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
      winHeight = document.body.clientHeight;
    }

    console.log(isHeaderSmall, isFooterIn);
  }

  window._closeBody = closeBody;

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

})()
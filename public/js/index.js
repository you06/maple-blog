"use strict";

(function () {
    // init the year-month display
    initYearMonthDisplay();
    function initYearMonthDisplay() {
        var currentDate = '';
        $('.b-number-array').each(function (index, item) {
            console.log(item.getAttribute('date'));
            if (item.getAttribute('date') !== currentDate) {
                currentDate = item.getAttribute('date');
                for (var i = currentDate.length - 1; i >= 0; i--) {
                    item.innerHTML += '<div class="b-number b-number-' + currentDate[i] + '"></div>';
                }
                item.innerHTML += '<div class="cb"></div>';
            }
        });
    }
})()
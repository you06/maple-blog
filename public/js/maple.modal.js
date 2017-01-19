(function() {
    "use strict";

    var version = '1.0.0';


    var mapleModal = function (selector) {
        return mapleModal.fn.init(selector);
    }


    mapleModal.fn = mapleModal.prototype = {}

    mapleModal.fn.init = function (selector) {
        this.DOM = $(selector);
        this.DOM.addClass('maple-modal-block');
        // create cover in body
        this.cover = $('<div></div>');
        this.cover.addClass('maple-modal-cover');
        $(document.body).append(this.cover);
        this.cover.click(function() {
            mapleModal.fn.hide();
        });
        return this;
    }

    mapleModal.fn.show = function() {
        var self = this;
        self.DOM.css('display', 'block');
        self.cover.css('display', 'block');
        setTimeout(function() {
            self.DOM.css('opacity', '1');
            self.cover.css('opacity', '1');
        });
    }

    mapleModal.fn.hide = function() {
        var self = this;
        self.DOM.css('opacity', '0');
        self.cover.css('opacity', '0');
        setTimeout(function() {
            self.DOM.css('display', 'none');
            self.cover.css('display', 'none');
        }, 500);
    }

    window.mapleModal = mapleModal;
})()
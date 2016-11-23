(function() {
    "use strict";

    var version = '1.0.0';


    var assert = function (containerId) {
        return assert.fn.init(containerId);
    }


    assert.fn = assert.prototype = {
        version: version,

        container: undefined,

        assert: function(value, predict) {
            var ul = document.createElement('ul');
            // setting style
            ul.innerHTML = value ? predict : '---';
            ul.style.border = '2px solid #666';
            ul.style.lineHeight = '30px';
            ul.style.fontFamily = 'Arial';
            ul.style.fontSize = '20px';
            ul.style.background = '#efefef';
            this.container.appendChild(ul);
        }
    }


    assert.fn.init = function (containerId) {
        var assertResContainer = 
            containerId ? document.getElementById(containerId) : document.body;
        if (!assertResContainer) throw 'containerId not found'
        else {
            assert.fn.container = assertResContainer;
        }
        return this;
    }
    window.assert = assert;
})()
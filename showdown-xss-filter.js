/*
 *  Showdown XSS Filter extension
 *  https://github.com/VisionistInc/showdown-xss-filter
 *  2015, Visionist, Inc.
 *  License: MIT
 */
(function() {

  // Server-side import
  if (typeof module !== 'undefined') {
    filterXSS = require('xss');
  }

  // Filter out potential XSS attacks before rendering HTML
  var xssfilter = function (converter) {
    return [
      {
        type: "output",
        filter: function(text) {
          var whiteList = filterXSS.getDefaultWhiteList();
          whiteList = Object.assign(whiteList, {
            a: ["id", "target", "href", "title"],
            h1: ["id"],
            h2: ["id"]
          });
          return filterXSS(text, {
              whiteList: whiteList
            });
        }
      }
    ];
  };

  // Client-side export
  if (typeof window !== 'undefined' && window.showdown && window.showdown.extensions) {
    window.showdown.extension('xssfilter', xssfilter);
  }

  // Server-side export
  if (typeof module !== 'undefined') {
    module.exports = xssfilter;
  }
})();

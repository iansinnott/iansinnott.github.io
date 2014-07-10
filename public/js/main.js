(function(window, undefined) {
  "use strict";

  /**
   * ------------------------------------------------
   * User Agent detection taken from ua.js:
   * https://github.com/g13n/ua.js/blob/master/src/ua.js
   * ------------------------------------------------
   */
  var userAgent = (window.navigator && navigator.userAgent) || "";

  function detect(pattern) {
    return function () {
      return (pattern).test(userAgent);
    };
  }

  /**
   * I completely stripped down ua.js since I only need mobile detection.
   */
  var UA = {
    isMobile: detect(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i),
    isIOS: detect(/(ipad|iphone|ipod)/i)
  };

  /**
   * ------------------------------------------------
   * END ua.js code
   * ------------------------------------------------
   */

  /**
   * Get an element by id
   * @return {object} DOM Element
   */
  function $(id) {
    return document.getElementById(id);
  }

  /**
   * Set up menu variables.
   */
  var toggle = $('super-toggle'),
      wrap   = $('wrap'),
      menu   = $('super-nav');

  // This is a weird one, but mobile safari won't buble click events up to
  // document.body unless the element in question is cursor set to pointer.
  if (UA.isMobile()) {
    wrap.style.cursor = 'pointer';
  }

  // This is already set in css, but set again here since JS doesn't seem to
  // pick it up
  menu.style.right = '-200px';

  var menuOpen = function() {
    return menu.style.right !== '-200px';
  }

  /**
   * Toggle the menu by either sliding it out or hiding it.
   */
  var toggleMenu = function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (menuOpen()) {
      menu.style.right = '-200px';
      wrap.style.left = '0px';
    } else {
      menu.style.right = '0px';
      wrap.style.left = '-200px';
    }
  };

  var closeMenu = function(e) {
    if (!menuOpen()) return;
    menu.style.right = '-200px';
    wrap.style.left = '0px';
  };

  toggle.addEventListener('click', toggleMenu);
  document.body.addEventListener('click', closeMenu);

  menu.addEventListener('click', function(e) {
    e.stopPropagation();
  });

})(this);

(function(window, undefined) {

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

  // This is already set in css, but set again here since JS doesn't seem to
  // pick it up
  menu.style.right = '-280px';

  var menuOpen = function() {
    return menu.style.right !== '-280px';
  }

  /**
   * Toggle the menu by either sliding it out or hiding it.
   */
  var toggleMenu = function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (menuOpen()) {
      menu.style.right = '-280px';
      wrap.style.left = '0px';
    } else {
      menu.style.right = '0px';
      wrap.style.left = '-280px';
    }
  };

  var closeMenu = function(e) {
    if (!menuOpen()) return;
    menu.style.right = '-280px';
    wrap.style.left = '0px';
  };

  toggle.addEventListener('click', toggleMenu);
  document.body.addEventListener('click', closeMenu);

  menu.addEventListener('click', function(e) {
    e.stopPropagation();
  });

})(this);

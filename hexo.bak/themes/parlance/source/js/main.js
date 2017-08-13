/**
 * NOTE: This script is not being used. Initially I had set it up to provide my
 * own mini event handling framework, however it turned out that almost all the
 * JS uses cases I had could actually be handled in CSS with :hover. All that
 * was left was auto-selecting the input of the share menu whne a user focuses
 * it, and since it's such a short function I simply inlined it in the `onfocus`
 * event handler.
 */
(function() {
  var $ = function(selector) {
    return [].slice.call(document.querySelectorAll(selector));
  };

  // Consolidate all handlers here. They will be called with `this` equal to the
  // element that captured the event, but I chose to use current target to avoid
  // using context.
  var handlers = {
    show: function(e) {
      var target = $(e.currentTarget.dataset.target)[0];
      !!target && target.classList.add('open');
    },

    toggle: function(e) {
      var target = $(e.currentTarget.dataset.target)[0];
      !!target && target.classList.toggle('open');
    },

    hide: function(e) {
      var target = $(e.currentTarget.dataset.target)[0];
      !!target && target.classList.remove('open');
    },

    preventDefault: function(e) {
      e.preventDefault();
    },
  };

  var elements = $('[data-event-handler]');

  elements.forEach(function(el) {
    el.dataset.eventHandler.split(',').forEach(function(pair) {
      var _ref = pair.split(':')
      var event = _ref[0];
      var handlerName = _ref[1];
      var handler = handlers[handlerName];

      // Avoid silent handler undefined issues
      if (!handler) {
        console.warn('Tried to assign undefined "' + handlerName + '" handler to "' + event + '" event.', el);
      }

      el.addEventListener(event, handler);
    })
  });
})();

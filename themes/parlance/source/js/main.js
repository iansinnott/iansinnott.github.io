(function() {
  var $ = function(selector) {
    return [].slice.call(document.querySelectorAll(selector));
  };

  // Consolidate all handlers here. They will be called with `this` equal to the
  // element that captured the event, but I chose to use current target to avoid
  // using context.
  var handlers = {
    selectAll: function(e) {
      var el = e.currentTarget;
      el.setSelectionRange(0, el.value.length);
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

(function() {
  // Helpers
  var $ = function(selector) {
    return [].slice.call(document.querySelectorAll(selector));
  };

  // Consolidate all handlers here. They will be called with `this` equal to the
  // element that captured the event, but I chose to use current target to avoid
  // using context.
  var handlers = {
    toggleNav: function(e) {
      var el = e.currentTarget;
      var targetEl = $(el.dataset.target)[0];
      targetEl.classList.toggle('open');
    },
  };

  // Attach all event handlers.
  var elements = $('[data-event-handler]');

  elements.forEach(function(el) {
    var _ref = el.dataset.eventHandler.split(':')
    var event = _ref[0];
    var handler = _ref[1];

    el.addEventListener(event, handlers[handler]);
  });
})();

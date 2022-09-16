export const KeyboardShortcut = function({
  debug = false,
  keycode = false,
  ctrl = false,
  shift = false,
  alt = false,
  action = false
} = {}) {

  this.action = () => {

    if (debug) { console.log(event.keyCode); };

    if (keycode) {

      if (
        keycode.includes(event.keyCode) &&
        (ctrl == event.ctrlKey) &&
        (shift == event.shiftKey) &&
        (alt == event.altKey)
      ) {

        event.preventDefault();

        if (action) {
          action();
        }

      }

    }

  };

  this.add = () => window.addEventListener('keydown', this.action);

  this.remove = () => window.removeEventListener('keydown', this.action);

  this.add();

};

import { KeyboardShortcut } from '../KeyboardShortcut';

import { app } from '../../';

export const FullScreen = function() {

  this.toggleFullScreen = () => {

    if (!document.fullscreenElement) {

      document.documentElement.requestFullscreen();

      app.message.render('FULLSCREEN');

    } else if (document.exitFullscreen) {

      document.exitFullscreen();

    };

  }

  this.bind = () => {

    let togglePlayVideo = new KeyboardShortcut({ keycode: [70], action: this.toggleFullScreen });

  }

  this.bind();

}

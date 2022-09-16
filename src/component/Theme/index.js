import { app } from '../../';
import { config } from '../../config';
import { KeyboardShortcut } from '../KeyboardShortcut';
import { applyCSSVar } from '../../utility/applyCSSVar';
import { applyColorRangeCSSVar } from '../../utility/applyColorRangeCSSVar';

import WebFont from 'webfontloader';

import './index.css';

export const Theme = function() {

  this.toggleDark = () => {

    if (config.theme.dark) {

      config.theme.dark = false;

    } else {

      config.theme.dark = true;

    }

  }

  this.reverseContrast = (colorObject) => {

    const newColorObject = {
      h: colorObject.h,
      s: colorObject.s,
      contrast: {
        start: colorObject.contrast.end,
        end: colorObject.contrast.start
      },
      shades: colorObject.shades
    };

    return newColorObject;
  }

  this.style = () => {

    applyCSSVar('--Theme__scale', config.theme.scale);

    if (config.theme.dark) {

      applyColorRangeCSSVar('--Theme__text', this.reverseContrast(config.theme.text));
      applyColorRangeCSSVar('--Theme__primary', this.reverseContrast(config.theme.primary));
      applyColorRangeCSSVar('--Theme__accent', this.reverseContrast(config.theme.accent));

    } else {

      applyColorRangeCSSVar('--Theme__text', config.theme.text);
      applyColorRangeCSSVar('--Theme__primary', config.theme.primary);
      applyColorRangeCSSVar('--Theme__accent', config.theme.accent);

    }

    applyCSSVar('--Theme__transitionSpeedXFast', (config.theme.transition.speed.xfast / 100));
    applyCSSVar('--Theme__transitionSpeedFast', (config.theme.transition.speed.fast / 100));
    applyCSSVar('--Theme__transitionSpeedMedium', (config.theme.transition.speed.medium / 100));
    applyCSSVar('--Theme__transitionSpeedSlow', (config.theme.transition.speed.slow / 100));
    applyCSSVar('--Theme__transitionSpeedXSlow', (config.theme.transition.speed.xslow / 100));

    applyCSSVar('--Theme__easingBounce', `cubic-bezier(${config.theme.easing.bounce[0]}, ${config.theme.easing.bounce[1]}, ${config.theme.easing.bounce[2]}, ${config.theme.easing.bounce[3]})`);

    applyCSSVar('--Theme__fontDisplay', `"${config.theme.font.display}", sans-serif`);

    applyCSSVar('--Theme__fontUi', `"${config.theme.font.ui}", sans-serif`);

  }

  this.font = () => {

    WebFont.load({
      // fontloading: (familyName, fvd) => console.log('fontloading:', familyName, fvd),
      google: { families: [config.theme.font.display + ':100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'] }
    });

    WebFont.load({
      // fontloading: (familyName, fvd) => console.log('fontloading:', familyName, fvd),
      google: { families: [config.theme.font.ui + ':100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'] }
    });

  }

  this.bind = () => {

    let toggleDark = new KeyboardShortcut({
      keycode: [68],
      action: () => {

        this.toggleDark();

        this.style();

        if (config.theme.dark) {

          app.message.render('DARK MODE');

        } else {

          app.message.render('LIGHT MODE');

        }

      }
    });

  }

  this.render = () => {

    this.style();

    this.font();

  }

  this.render();

  this.bind();

}

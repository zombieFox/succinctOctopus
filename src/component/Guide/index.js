import { app } from '../../';
import { node } from '../../utility/node';
import { complexNode } from '../../utility/complexNode';
import { KeyboardShortcut } from '../KeyboardShortcut';

import './index.css';

export const Guide = function () {

  this.open = false;

  this.toggle = () => {

    if (this.open) {

      this.open = false;

    } else {

      this.open = true;

    }

  }

  this.content = [
    { key: ['H'], message: 'Toggle help.' },
    { key: ['1'], message: 'Change to SQUARE gallery layout.' },
    { key: ['2'], message: 'Change to FLEX gallery layout.' },
    { key: ['3'], message: 'Change to COLUMN gallery layout.' },
    { key: ['4'], message: 'Change to SOLO gallery layout.' },
    { key: ['Q', 'W'], message: 'Cycle back and forth between gallery layouts.' },
    { key: ['E'], message: 'Cycle back and forth between VERTICAL and HORIZONTAL layout direction.' },
    { key: ['T', 'Y'], message: 'Increase or decrease gallery gap.' },
    { key: ['U', 'I'], message: 'Increase or decrease gallery corner radius.' },
    { key: ['-', '+'], message: 'Increase or decrease grid count or zoom amount in SOLO view.' },
    { key: ['S'], message: 'Cycle between playing and pausing all videos.' },
    { key: ['M'], message: 'Cycle between muting and unmuting all videos.' },
    { key: ['Z'], message: 'Toggle zoom only in SOLO view.' },
    { key: ['X'], message: 'Change zoom style in SOLO view.' },
    { key: ['↓', '↑'], message: 'Jump between media in SOLO view.' },
    { key: ['O', 'P'], message: 'Increase or decrease zoom border.' },
    { key: ['D'], message: 'Cycle between light and dark mode.' },
    { key: ['F'], message: 'Toggle fullscreen.' },
    { key: ['0'], message: 'Reset all gallery layouts.' },
  ]

  this.node = {
    guide: node('div|class:Guide'),
    modal: node('div|class:Guide__modal'),
    intro: node('div|class:Guide__intro'),
    heading: node('h1:Keybaord shortcuts|class:Guide__heading'),
    description: node('p:Succinct Octopus has many features. These can be controlled with keybaord shortcuts.|class:Guide__description'),
    content: node('div|class:Guide__content'),
    toggle: node('button:?|class:Guide__toggle')
  }

  this.render = () => {

    this.node.intro.append(this.node.heading);

    this.node.intro.append(this.node.description);

    this.node.modal.append(this.node.intro);

    this.node.modal.append(this.node.content);

    this.content.forEach(contentItem => {

      let line = node('p|class:Guide__contentItem');

      let key = node('span|class:Guide__key');

      contentItem.key.forEach(keyArrayItem => {

        let keyItem = node(`span:${keyArrayItem}|class:Guide__keyItem`);

        key.append(keyItem);

      });

      let message = node(`span:${contentItem.message}|class:Guide__message`);

      line.append(key);

      line.append(message);

      this.node.content.append(line);

    });

    this.node.guide.append(this.node.modal);

    this.node.guide.append(this.node.toggle);

  }

  this.style = () => {

    if (this.open) {

      this.node.guide.classList.add('Guide__show');

    } else {

      this.node.guide.classList.remove('Guide__show');

    }

  }

  this.bind = () => {

    let toggleOpen = new KeyboardShortcut({
      keycode: [72],
      action: () => {

        this.toggle();

        this.style();

        if (this.open) {

          app.message.render('HELP');

        }

      }
    });

    this.node.toggle.addEventListener('click', () => {

      this.toggle();

      this.style();

      if (this.open) {

        app.message.render('HELP');

      }

    });

  }

  this.getNode = () => this.node.guide;

  this.render();

  this.bind();

}

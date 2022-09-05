import { Base } from '../Base';
import { Body } from '../Body';
import { Theme } from '../Theme';
import { Grid } from '../Grid';
import { FullScreen } from '../FullScreen';
import { Message } from '../Message';
import { Guide } from '../Guide';

import { node } from '../../utility/node';

import './index.css';

export const App = function() {

  this.node = {
    app: node('div|class:App')
  }

  this.base = new Base();

  this.body = new Body();

  this.theme = new Theme();

  this.grid = new Grid();

  this.message = new Message();

  this.fullScreen = new FullScreen();

  this.guide = new Guide();

  this.render = () => {

    this.node.app.append(this.grid.getNode());

    this.node.app.append(this.message.getNode());

    this.node.app.append(this.guide.getNode());

    document.querySelector('body').append(this.node.app);

  }

  this.render();

};

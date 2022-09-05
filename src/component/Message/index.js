import { node } from '../../utility/node';
import { complexNode } from '../../utility/complexNode';
import { clearChildNode } from '../../utility/clearChildNode';

import './index.css';

export const Message = function() {

  this.node = {
    message: node('div|class:Message'),
    area: node('div|class:Message__area'),
  }

  this.makeMessageItem = (messageData) => {

    let item = complexNode({
      tag: 'p',
      text: messageData,
      attr: [{ key: 'class', value: 'Message__item' }]
    });

    return item;

  }

  this.removeTimer = null;

  this.render = (messageData) => {

    clearChildNode(this.node.area);

    let messageItem = this.makeMessageItem(messageData);

    window.clearTimeout(this.removeTimer);

    this.removeTimer = setTimeout(() => {

      clearChildNode(this.node.area);

    }, 800);

    this.node.area.append(messageItem);

    this.node.message.append(this.node.area);

  }

  this.getNode = () => this.node.message;

};

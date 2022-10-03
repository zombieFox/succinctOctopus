import { node } from '../../utility/node';
import { complexNode } from '../../utility/complexNode';

import './index.css';

export const LoadingIcon = function() {

  this.node = {
    loading: node('div|class:LoadingIcon'),
  }

  this.getNode = () => this.node.loading;

};

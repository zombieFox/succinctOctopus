import { node } from '../../utility/node';
import { applyCSSVar } from '../../utility/applyCSSVar';

import './index.css';

export const Image = function({ mediaData = null, scrub = false } = {}) {

  this.node = {
    image: node('div|class:Image'),
    content: node('img|class:Image__content'),
  }

  this.gcd = (w, h) => {
    return (h == 0) ? w : this.gcd(h, w % h);
  }

  this.aspectRatio = () => {

    const gcd = this.gcd(this.node.content.naturalWidth, this.node.content.naturalHeight);

    return `${this.node.content.naturalWidth / gcd} / ${this.node.content.naturalHeight / gcd}`;

  }

  this.render = () => {

    this.node.content.src = `${mediaData.path}.${mediaData.type}`;

    this.node.image.appendChild(this.node.content);

  }

  this.squareThreshold = 0.85;

  this.bind = () => {

    this.node.content.onload = () => {

      if (
        (this.node.content.naturalWidth == this.node.content.naturalHeight) ||
        (
          (this.node.content.naturalWidth > (this.node.content.naturalHeight * this.squareThreshold) && this.node.content.naturalWidth <= this.node.content.naturalHeight) ||
          (this.node.content.naturalHeight > (this.node.content.naturalWidth * this.squareThreshold) && this.node.content.naturalHeight <= this.node.content.naturalWidth)
        )
      ) {

        mediaData.gridItem.orientation('square');

      } else if (this.node.content.naturalWidth > this.node.content.naturalHeight) {

        mediaData.gridItem.orientation('landscape');

      } else if (this.node.content.naturalWidth < this.node.content.naturalHeight) {

        mediaData.gridItem.orientation('portrait');

      }

      applyCSSVar('--GridItem__aspectRatio', this.aspectRatio(), mediaData.gridItem.getNode());

      mediaData.gridItem.size();

      this.node.content.classList.add('Image__loaded');

    }

  }

  this.getNode = () => this.node.content;

  this.render();

  this.bind();

};

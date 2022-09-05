import { node } from '../../utility/node';
import { applyCSSVar } from '../../utility/applyCSSVar';

import './index.css';

export const Image = function(mediaData) {

  this.node = {
    image: node('img|class:Image')
  }

  this.gcd = (w, h) => {
    return (h == 0) ? w : this.gcd(h, w % h);
  }

  this.aspectRatio = () => {

    const gcd = this.gcd(this.node.image.naturalWidth, this.node.image.naturalHeight);

    return `${this.node.image.naturalWidth / gcd} / ${this.node.image.naturalHeight / gcd}`;

  }

  this.render = () => {

    this.node.image.src = `${mediaData.path}.${mediaData.type}`;

  }

  this.squareThreshold = 0.85;

  this.bind = () => {

    this.node.image.onload = () => {

      if (
        (this.node.image.naturalWidth == this.node.image.naturalHeight) ||
        (
          (this.node.image.naturalWidth > (this.node.image.naturalHeight * this.squareThreshold) && this.node.image.naturalWidth <= this.node.image.naturalHeight) ||
          (this.node.image.naturalHeight > (this.node.image.naturalWidth * this.squareThreshold) && this.node.image.naturalHeight <= this.node.image.naturalWidth)
        )
      ) {

        mediaData.gridItem.orientation('square');

      } else if (this.node.image.naturalWidth > this.node.image.naturalHeight) {

        mediaData.gridItem.orientation('landscape');

      } else if (this.node.image.naturalWidth < this.node.image.naturalHeight) {

        mediaData.gridItem.orientation('portrait');

      }

      applyCSSVar('--GridItem__aspectRatio', this.aspectRatio(), mediaData.gridItem.getNode());

      this.node.image.classList.add('Image__loaded');

    }

  }

  this.getNode = () => this.node.image;

  this.render();

  this.bind();

};

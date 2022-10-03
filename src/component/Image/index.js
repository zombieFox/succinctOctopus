import { LoadingIcon } from '../LoadingIcon';

import { node } from '../../utility/node';
import { applyCSSVar } from '../../utility/applyCSSVar';

import './index.css';

export const Image = function({ mediaData = null, scrub = false, onLoadFunc } = {}) {

  this.node = {
    image: node('div|class:Image'),
    content: node('img|class:Image__content'),
    loadingIcon: new LoadingIcon(),
  }

  this.gcd = (w, h) => {
    return (h == 0) ? w : this.gcd(h, w % h);
  }

  this.aspectRatio = () => {

    const gcd = this.gcd(this.naturalWidth, this.naturalHeight);

    return `${this.naturalWidth / gcd} / ${this.naturalHeight / gcd}`;

  }

  this.squareThreshold = 0.95;

  this.orientation = false;

  this.naturalWidth = false;

  this.naturalHeight = false;

  this.loadError = false;

  this.bind = ({ onLoadFunc }) => {

    this.node.content.onload = () => {

      this.naturalWidth = this.node.content.naturalWidth;

      this.naturalHeight = this.node.content.naturalHeight;

      if (
        (this.naturalWidth == this.naturalHeight) ||
        (
          (this.naturalWidth > (this.naturalHeight * this.squareThreshold) && this.naturalWidth <= this.naturalHeight) ||
          (this.naturalHeight > (this.naturalWidth * this.squareThreshold) && this.naturalHeight <= this.naturalWidth)
        )
      ) {

        this.orientation = 'square';

      } else if (this.naturalWidth > this.naturalHeight) {

        this.orientation = 'landscape';

      } else if (this.naturalWidth < this.naturalHeight) {

        this.orientation = 'portrait';

      }

      mediaData.gridItem.orientation(this.orientation);

      applyCSSVar('--GridItem__mediaAspectRatio', this.aspectRatio(), mediaData.gridItem.getNode());

      if (onLoadFunc) { onLoadFunc(); };

      this.node.image.classList.remove('Image__loading');

      this.node.image.classList.add('Image__loaded');

      this.node.loadingIcon.getNode().remove();

    }

    this.node.content.onerror = () => {

      mediaData.gridItem.loadError();

      this.loadError = true;

    }

  }

  this.render = () => {

    this.node.image.classList.add('Image__loading');

    this.node.image.append(this.node.loadingIcon.getNode());

    this.node.content.src = mediaData.url;

    this.node.image.append(this.node.content);

  }

  this.getNode = () => this.node.image;

  this.render();

  this.bind({ onLoadFunc: onLoadFunc });

};

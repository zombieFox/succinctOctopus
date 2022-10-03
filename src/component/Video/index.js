import { LoadingIcon } from '../LoadingIcon';

import { app } from '../../';
import { config } from '../../config';
import { node } from '../../utility/node';
import { applyCSSVar } from '../../utility/applyCSSVar';

import './index.css';

export const Video = function({ mediaData = null, scrub = false, onLoadFunc } = {}) {

  this.node = {
    video: node('div|class:Video'),
    content: node('video|class:Video__content,loop,muted'),
    source: node('source'),
    progress: node('div|class:Video__progress'),
    bar: node('div|class:Video__bar'),
    loadingIcon: new LoadingIcon(),
  }

  this.play = () => {

    var playPromise = this.node.content.play();

    if (playPromise !== undefined) {

      playPromise.catch(error => {
        // console.log(error);
      });

    }

  }

  this.pause = () => {

    this.node.content.pause();

  }

  this.togglePlay = () => {

    if (this.isPaused()) {

      this.play();

    } else {

      this.pause();

    }

  }

  this.autoPause = () => {

    setTimeout(() => {

      this.pause();

    }, 200);

  }

  this.isPaused = () => {

    return this.node.content.paused;

  }

  this.unmute = () => {

    this.node.content.muted = false;

  }

  this.mute = () => {

    this.node.content.muted = true;

  }

  this.toggleMuted = () => {

    if (this.isMuted()) {

      this.unmute();

    } else {

      this.mute();

    }

  }

  this.isMuted = () => {

    return this.node.content.muted;

  }

  this.currentTimeSet = (time) => {

    if (time != 'undefined') {

      this.node.content.currentTime = time;

    };

  }

  this.currentTimeGet = (time) => {

    return this.node.content.currentTime;

  }

  this.gcd = (width, height) => {
    return (height == 0) ? width : this.gcd(height, width % height);
  }

  this.aspectRatio = () => {

    const gcd = this.gcd(this.naturalWidth, this.naturalHeight);

    return `${this.naturalWidth / gcd} / ${this.naturalHeight / gcd}`;

  }

  this.scrub = (event) => {

    let padding = 10;

    let rect = this.node.video.getBoundingClientRect();

    let cursorPostionX = event.clientX - (rect.left + padding);

    this.node.content.currentTime = cursorPostionX / (rect.width - (padding * 2)) * this.node.content.duration;

  }

  this.progressBar = (event) => {

    applyCSSVar('--Video__progress', ((this.node.content.currentTime / this.node.content.duration) * 100), this.node.video);

  }

  this.squareThreshold = 0.95;

  this.orientation = false;

  this.naturalWidth = false;

  this.naturalHeight = false;

  this.loadError = false;

  this.bind = ({ onLoadFunc }) => {

    this.node.content.addEventListener('click', () => {

      if (event.altKey) {

        this.togglePlay();

        app.grid.zoomer.togglePlayVideo();

      }

    });

    this.node.content.addEventListener('click', (event) => {

      if (event.shiftKey) { this.toggleMuted(); }

    });

    this.node.video.addEventListener('mousemove', (event) => {

      if (event.altKey) {

        this.scrub(event);

        this.progressBar(event);

      }

    });

    this.node.progress.addEventListener('click', (event) => {

      this.scrub(event);

    });

    this.node.content.addEventListener('timeupdate', (event) => {

      this.progressBar(event);

    });

    this.node.content.addEventListener('loadedmetadata', () => {

      this.naturalWidth = this.node.content.videoWidth;

      this.naturalHeight = this.node.content.videoHeight;

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

      this.node.video.classList.remove('Video__loading');

      this.node.video.classList.add('Video__loaded');

      this.node.loadingIcon.getNode().remove();

    });

    this.node.source.addEventListener('error', (event) => {

      mediaData.gridItem.loadError();

      this.loadError = true;

    });

    window.addEventListener('visibilitychange', this.autoPause);

    window.addEventListener('blur', this.autoPause);

  }

  this.render = () => {

    this.node.video.classList.add('Video__loading');

    this.node.video.append(this.node.loadingIcon.getNode());

    this.node.video.append(this.node.content);

    this.node.content.append(this.node.source);

    if (scrub) {

      this.node.progress.append(this.node.bar);

      this.node.video.append(this.node.progress);

    }

    this.node.content.muted = true;

    this.node.content.loop = true;

    this.node.content.autoplay = config.media.autoPlay;

    this.node.source.type = 'video/mp4';

    this.node.source.src = mediaData.url;

  }

  this.getNode = () => this.node.video;

  this.render();

  this.bind({ onLoadFunc: onLoadFunc });

};

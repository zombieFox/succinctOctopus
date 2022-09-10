import { app } from '../../';
import { config } from '../../config';
import { node } from '../../utility/node';
import { applyCSSVar } from '../../utility/applyCSSVar';

import './index.css';

export const Video = function({ mediaData = null, scrub = false } = {}) {

  this.node = {
    video: node('div|class:Video'),
    content: node('video|class:Video__content,loop,muted'),
    source: node('source'),
    scrub: node('div|class:Video__scrubArea'),
    progress: node('div|class:Video__progress'),
    bar: node('div|class:Video__bar'),
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

  this.render = () => {

    this.node.video.appendChild(this.node.content);

    this.node.content.appendChild(this.node.source);

    if (scrub) {

      this.node.progress.appendChild(this.node.bar);

      this.node.video.appendChild(this.node.progress);

      this.node.video.appendChild(this.node.scrub);

    }

    this.node.content.muted = true;

    this.node.content.loop = true;

    this.node.content.autoplay = config.media.autoPlay;

    if (mediaData.path.includes('mp4') || mediaData.path.endsWith('mp4')) {

      this.node.source.type = 'video/mp4';

    } else if (mediaData.path.includes('webm') || mediaData.path.endsWith('webm')) {

      this.node.source.type = 'video/webm';

    }

    this.node.source.src = `${mediaData.path}.${mediaData.type}`;

  }

  this.scrub = (event) => {

    let padding = 20;

    let rect = mediaData.gridItem.node.mediaItem.node.scrub.getBoundingClientRect();

    let cursorPostionX = event.clientX - rect.left;

    this.node.content.currentTime = cursorPostionX / rect.width * this.node.content.duration;

  }

  this.progressBar = (event) => {

    applyCSSVar('--Video__progress', ((this.node.content.currentTime / this.node.content.duration) * 100), this.node.video);

  }

  this.squareThreshold = 0.85;

  this.orientation = false;

  this.naturalWidth = false;

  this.naturalHeight = false;

  this.bind = () => {

    this.node.content.addEventListener('click', () => {

      if (event.altKey) {

        this.togglePlay();

        app.grid.zoomer.togglePlayVideo();

      }

    });

    this.node.content.addEventListener('click', (event) => {

      if (event.shiftKey) { this.toggleMuted(); }

    });

    this.node.content.addEventListener('mousemove', (event) => {

      if (event.altKey) {

        this.scrub(event);

        this.progressBar(event);

      }

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

      mediaData.gridItem.size();

      this.node.video.classList.add('Video__loaded');

    });

    window.addEventListener('visibilitychange', this.autoPause);

    window.addEventListener('blur', this.autoPause);

  }

  this.getNode = () => this.node.video;

  this.render();

  this.bind();

};

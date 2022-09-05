import { app } from '../../';
import { config } from '../../config';
import { node } from '../../utility/node';
import { applyCSSVar } from '../../utility/applyCSSVar';

import './index.css';

export const Video = function(mediaData) {

  this.node = {
    video: node('video|class:Video,loop,muted'),
    source: node('source')
  }

  this.play = () => {

    var playPromise = this.node.video.play();

    if (playPromise !== undefined) {

      playPromise.catch(error => {
        // console.log(error);
      });

    }

  }

  this.pause = () => {

    this.node.video.pause();

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

    return this.node.video.paused;

  }

  this.unmute = () => {

    this.node.video.muted = false;

  }

  this.mute = () => {

    this.node.video.muted = true;

  }

  this.toggleMuted = () => {

    if (this.isMuted()) {

      this.unmute();

    } else {

      this.mute();

    }

  }

  this.isMuted = () => {

    return this.node.video.muted;

  }

  this.currentTimeSet = (time) => {

    if (time != 'undefined') {

      this.node.video.currentTime = time;

    };

  }

  this.currentTimeGet = (time) => {

    return this.node.video.currentTime;

  }

  this.gcd = (width, height) => {
    return (height == 0) ? width : this.gcd(height, width % height);
  }

  this.aspectRatio = () => {

    const gcd = this.gcd(this.node.video.videoWidth, this.node.video.videoHeight);

    return `${this.node.video.videoWidth / gcd} / ${this.node.video.videoHeight / gcd}`;

  }

  this.render = () => {

    this.node.video.appendChild(this.node.source);

    this.node.video.muted = true;

    this.node.video.loop = true;

    this.node.video.autoplay = config.media.autoPlay;

    if (mediaData.path.includes('mp4') || mediaData.path.endsWith('mp4')) {

      this.node.source.type = 'video/mp4';

    } else if (mediaData.path.includes('webm') || mediaData.path.endsWith('webm')) {

      this.node.source.type = 'video/webm';

    }

    this.node.source.src = `${mediaData.path}.${mediaData.type}`;

  }

  this.scrub = (event) => {

    let mediaItemLeftPosition = mediaData.gridItem.getNode().offsetLeft;

    let cursorPostionX = event.clientX - mediaItemLeftPosition;

    this.node.video.currentTime = cursorPostionX / mediaData.gridItem.getNode().clientWidth * this.node.video.duration;

  }

  this.squareThreshold = 0.85;

  this.bind = () => {

    this.node.video.addEventListener('click', () => {

      if (event.metaKey) {

        this.togglePlay();

        app.grid.zoomer.togglePlayVideo();

      }

    });

    this.node.video.addEventListener('click', (event) => {

      if (event.shiftKey) { this.toggleMuted(); }

    });

    this.node.video.addEventListener('mousemove', (event) => {

      if (event.metaKey) {

        this.scrub(event);

      }

    });

    this.node.video.addEventListener('loadedmetadata', () => {

      if (
        (this.node.video.videoWidth == this.node.video.videoHeight) ||
        (
          (this.node.video.videoWidth > (this.node.video.videoHeight * this.squareThreshold) && this.node.video.videoWidth <= this.node.video.videoHeight) ||
          (this.node.video.videoHeight > (this.node.video.videoWidth * this.squareThreshold) && this.node.video.videoHeight <= this.node.video.videoWidth)
        )
      ) {

        mediaData.gridItem.orientation('square');

      } else if (this.node.video.videoWidth > this.node.video.videoHeight) {

        mediaData.gridItem.orientation('landscape');

      } else if (this.node.video.videoWidth < this.node.video.videoHeight) {

        mediaData.gridItem.orientation('portrait');

      }

      applyCSSVar('--GridItem__aspectRatio', this.aspectRatio(), mediaData.gridItem.getNode());

      this.node.video.classList.add('Video__loaded');

    });

    window.addEventListener('visibilitychange', this.autoPause);

    window.addEventListener('blur', this.autoPause);

  }

  this.getNode = () => this.node.video;

  this.render();

  this.bind();

};

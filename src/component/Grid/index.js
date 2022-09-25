import { Media } from '../Media';
import { GridItem } from '../GridItem';
import { KeyboardShortcut } from '../KeyboardShortcut';
import { Zoomer } from '../Zoomer';

import { app } from '../../';
import { config } from '../../config';
import { node } from '../../utility/node';
import { applyCSSVar } from '../../utility/applyCSSVar';

import './index.css';

export const Grid = function() {

  this.media = new Media();

  this.node = {
    grid: node('div|class:Grid')
  }

  this.style = () => {

    applyCSSVar('--Grid__gapCount', config.grid.gap.count, this.node.grid);

    applyCSSVar('--Grid__radiusCount', config.grid.radius.count, this.node.grid);

    this.view.option.forEach(gridViewItem => {

      applyCSSVar(`--Grid__${gridViewItem.id}SizeCount`, gridViewItem.size.count, this.node.grid);

      this.node.grid.classList.remove(`Grid__${gridViewItem.id}`);

      if (gridViewItem.active) {

        this.node.grid.classList.add(`Grid__${gridViewItem.id}`);

      };

    });

    console.log(`[Grid] style applied`);

  }

  this.view = {}

  this.view.option = [
    config.grid.view.square,
    config.grid.view.grid,
    config.grid.view.flex,
    config.grid.view.column,
    config.grid.view.solo,
  ]

  this.view.option[0].id = 'square';

  this.view.option[1].id = 'grid';

  this.view.option[2].id = 'flex';

  this.view.option[3].id = 'column';

  this.view.option[4].id = 'solo';

  this.view.getActive = () => {

    let activeView = null;

    this.view.option.forEach(gridViewItem => {

      if (gridViewItem.active) {

        activeView = gridViewItem;

      };

    });

    return activeView;

    console.log(`[Grid] get active view`);

  }

  this.view.last = { id: null, scrollY: null }

  this.view.change = (id) => {

    this.view.option.forEach(gridViewItem => {

      gridViewItem.active = false;

      if (id === gridViewItem.id) {

        gridViewItem.active = true;

      };

    });

    console.log(`[Grid] view changed to ${id}`);

  }

  this.view.cycle = (direction) => {

    let activeIndex = 0;

    this.view.option.forEach((gridViewItem, index) => {

      if (gridViewItem.active) {
        activeIndex = index;
      };

      gridViewItem.active = false;

    });

    switch (direction) {

      case 'next':
        activeIndex++;
        break;

      case 'previous':
        activeIndex--;
        break;

    }

    if (activeIndex > (this.view.option.length - 1)) {
      activeIndex = 0;
    }

    if (activeIndex < 0) {
      activeIndex = this.view.option.length - 1;
    }

    this.view.option[activeIndex].active = true;

    console.log(`[Grid] view cycled ${direction} to ${this.view.option[activeIndex].id}`);

  }

  this.view.size = {};

  this.view.size.down = () => {

    let activeView = this.view.getActive();

    if (activeView.size.count > activeView.size.min) {

      activeView.size.count = activeView.size.count - activeView.size.increment;

    }

    console.log(`[Grid] ${activeView.id} size down to ${activeView.size.count}`);

  }

  this.view.size.up = () => {

    let activeView = this.view.getActive();

    if (activeView.size.count < activeView.size.max) {

      activeView.size.count = activeView.size.count + activeView.size.increment;

    }

    console.log(`[Grid] ${activeView.id} size up to ${activeView.size.count}`);

  }

  this.view.default = () => {

    let activeView = this.view.getActive();

    activeView.size.count = activeView.size.default;

    console.log(`[Grid] ${activeView.id} size set to default to ${activeView.size.count}`);

  }

  this.radius = {}

  this.radius.down = () => {

    if (config.grid.radius.count > config.grid.radius.min) {

      config.grid.radius.count = config.grid.radius.count - config.grid.radius.increment;

    }

    console.log(`[Grid] radius size down to ${config.grid.radius.count}`);

  }

  this.radius.up = () => {

    if (config.grid.radius.count < config.grid.radius.max) {

      config.grid.radius.count = config.grid.radius.count + config.grid.radius.increment;

    }

    console.log(`[Grid] radius size up to ${config.grid.radius.count}`);

  }

  this.radius.default = () => {

    config.grid.radius.count = config.grid.radius.default;

    console.log(`[Grid] radius size set to default to ${config.grid.radius.count}`);

  }

  this.gap = {}

  this.gap.down = () => {

    if (config.grid.gap.count > config.grid.gap.min) {

      config.grid.gap.count = config.grid.gap.count - config.grid.gap.increment;

    }

    console.log(`[Grid] gap size down to ${config.grid.gap.count}`);

  }

  this.gap.up = () => {

    if (config.grid.gap.count < config.grid.gap.max) {

      config.grid.gap.count = config.grid.gap.count + config.grid.gap.increment;

    }

    console.log(`[Grid] gap size up to ${config.grid.gap.count}`);

  }

  this.gap.default = () => {

    config.grid.gap.count = config.grid.gap.default;

    console.log(`[Grid] gap size set to default to ${config.grid.gap.count}`);

  }

  this.panReset = () => {

    this.allMediaItem.forEach(mediaItem => {

      mediaItem.gridItem.pan.reset();

    });

    console.log(`[Grid] reset grid item pan`);

  }

  this.magnificationVideoSync = () => {

    this.zoomer.syncVideo();

    console.log(`[Grid] zoomer video scrub`);

  }

  this.magnificationHide = () => {

    this.zoomer.hide();

    console.log(`[Grid] hide zoomer`);

  }

  this.magnificationMove = () => {

    this.zoomer.magnification.move();

    console.log(`[Grid] move zoomer`);

  }

  this.zoomBorderReset = () => {

    this.zoomer.border.default();

    this.zoomer.style();

  }

  this.allMediaItem = [];

  this.mediaInView = () => {

    this.allMediaItem.forEach(mediaItem => {

      let gridItemRect = mediaItem.gridItem.mediaItem.getNode().getBoundingClientRect();

      let windowHeight = window.innerHeight;

      if (gridItemRect.top >= ((window.innerHeight * 0.5) * -1) && gridItemRect.bottom <= (window.innerHeight * 1.5)) {

        mediaItem.inView = true;

      } else {

        mediaItem.inView = false;

      };

    });

  }

  this.inView = () => {

    let mediaItemInView = false;

    this.allMediaItem.forEach(mediaItem => {

      if (mediaItem.inView) {

        mediaItemInView = mediaItem;

      }

    });

    return mediaItemInView;

  }

  this.mediaOutView = () => {

    this.allMediaItem.forEach(mediaItem => {

      let gridItemRect = mediaItem.gridItem.mediaItem.getNode().getBoundingClientRect();

      let windowHeight = window.innerHeight;

      if (gridItemRect.bottom < ((window.innerHeight * 1.5) * -1) || gridItemRect.top > (window.innerHeight * 1.5)) {

        mediaItem.outView = true;

      } else {

        mediaItem.outView = false;

      };

    });

  }

  this.outView = () => {

    this.allMediaItem.forEach(mediaItem => {

      if (mediaItem.outView) {

        mediaItem.gridItem.hide();

      } else {

        mediaItem.gridItem.show();

      }

    });

  }

  this.videoInView = () => {

    let allVideoMediaItemInView = [];

    this.allMediaItem.forEach(mediaItem => {

      switch (mediaItem.gridItem.type) {

        case 'video':

          let gridItemRect = mediaItem.gridItem.getNode().getBoundingClientRect();

          let windowHeight = window.innerHeight;

          if (gridItemRect.top >= ((window.innerHeight * 0.25) * -1) && gridItemRect.bottom <= (window.innerHeight * 1.25)) {

            allVideoMediaItemInView.push(mediaItem);

          };

          break;

      }

    });

    return allVideoMediaItemInView;

  }

  this.autoPlayVideoInView = () => {

    this.allMediaItem.forEach(mediaItem => {

      switch (mediaItem.gridItem.type) {

        case 'video':

          mediaItem.gridItem.mediaItem.pause();

          break;

      }

    });

    this.videoInView().forEach(mediaItem => {

      if (mediaItem.gridItem.mediaItem.isPaused()) {

        mediaItem.gridItem.mediaItem.play();

      }

    });

  }

  this.videoMute = true;

  this.allVideoTogglePlay = () => {

    if (config.media.autoPlay) {
      config.media.autoPlay = false;
    } else {
      config.media.autoPlay = true;
    }

    this.allMediaItem.forEach(mediaItem => {

      switch (mediaItem.gridItem.type) {

        case 'video':

          if (config.media.autoPlay) {
            mediaItem.gridItem.mediaItem.play();
          } else {
            mediaItem.gridItem.mediaItem.pause();
          }

          break;

      }

    });

    console.log(`[Grid] toggle all video play`);

  }

  this.allVideoToggleMute = () => {

    if (this.videoMute) {
      this.videoMute = false;
    } else {
      this.videoMute = true;
    }

    this.allMediaItem.forEach(mediaItem => {

      switch (mediaItem.gridItem.type) {

        case 'video':

          if (this.videoMute) {
            mediaItem.gridItem.mediaItem.mute();
          } else {
            mediaItem.gridItem.mediaItem.unmute();
          }

          break;

      }

    });

    console.log(`[Grid] toggle all video mute`);

  }

  this.gridItemSize = () => {

    this.allMediaItem.forEach(mediaItem => {

      mediaItem.gridItem.size();

    });

    console.log(`[Grid] grid item size`);

  }

  this.gridItemMax = () => {

    this.allMediaItem.forEach(mediaItem => {

      mediaItem.gridItem.max();

    });

    console.log(`[Grid] grid item max`);

  }

  this.bind = () => {

    let reset = new KeyboardShortcut({
      keycode: [48],
      action: () => {

        this.view.default();

        this.radius.default();

        this.gap.default();

        this.style();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        this.panReset();

        this.magnificationVideoSync();

        this.magnificationMove();

        this.zoomBorderReset();

        app.message.render('RESET');

      }
    });

    let toggleVideoPlay = new KeyboardShortcut({
      keycode: [83],
      action: () => {

        this.allVideoTogglePlay();

        this.zoomer.togglePlayVideo();

        app.message.render('');

        if (config.media.autoPlay) {
          app.message.render('VIDEO PLAY');
        } else {
          app.message.render('VIDEO PAUSE');
        }

      }
    });

    let toggleVideoMute = new KeyboardShortcut({
      keycode: [77],
      action: () => {

        this.allVideoToggleMute();

        if (this.videoMute) {
          app.message.render('VIDEO MUTE');
        } else {
          app.message.render('VIDEO UNMUTE');
        }

      }
    });

    let decreaseViewSize = new KeyboardShortcut({
      keycode: [187],
      action: () => {

        this.view.size.up();

        this.style();

        this.panReset();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        switch (this.view.getActive().id) {

          case 'square':

            app.message.render(`${this.view.option[0].id.toUpperCase()} ${config.grid.view.square.size.count}`);

            break;

          case 'grid':

            app.message.render(`${this.view.option[1].id.toUpperCase()} ${config.grid.view.grid.size.count}`);

            break;

          case 'flex':

            app.message.render(`${this.view.option[2].id.toUpperCase()} ${config.grid.view.flex.size.count}`);

            break;

          case 'column':

            app.message.render(`${this.view.option[3].id.toUpperCase()} ${config.grid.view.column.size.count}`);

            break;

        }

        if (config.media.autoPlay) {

          this.autoPlayVideoInView();

        }

      }
    });

    let increaseViewSize = new KeyboardShortcut({
      keycode: [189],
      action: () => {

        this.view.size.down();

        this.style();

        this.panReset();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        switch (this.view.getActive().id) {

          case 'square':

            app.message.render(`${this.view.option[0].id.toUpperCase()} ${config.grid.view.square.size.count}`);

            break;

          case 'grid':

            app.message.render(`${this.view.option[1].id.toUpperCase()} ${config.grid.view.grid.size.count}`);

            break;

          case 'flex':

            app.message.render(`${this.view.option[2].id.toUpperCase()} ${config.grid.view.flex.size.count}`);

            break;

          case 'column':

            app.message.render(`${this.view.option[3].id.toUpperCase()} ${config.grid.view.column.size.count}`);

            break;

        }

        if (config.media.autoPlay) {

          this.autoPlayVideoInView();

        }

      }
    });

    let decreaseMagnificationSolo = new KeyboardShortcut({
      keycode: [189],
      action: () => {

        switch (this.view.getActive().id) {

          case 'solo':

            this.view.size.down();

            this.style();

            this.magnificationMove();

            app.message.render(`ZOOM x${config.grid.view.solo.size.count / 2}`);

            break;

        }

      }
    });

    let increaseMagnificationSolo = new KeyboardShortcut({
      keycode: [187],
      action: () => {

        switch (this.view.getActive().id) {

          case 'solo':

            this.view.size.up();

            this.style();

            this.magnificationMove();

            app.message.render(`ZOOM x${config.grid.view.solo.size.count / 2}`);

            break;

        }

      }
    });

    let decreaseScrollSolo = new KeyboardShortcut({
      keycode: [39, 40],
      action: () => {

        switch (this.view.getActive().id) {

          case 'solo':

            this.node.grid.scrollTop = this.node.grid.scrollTop + window.innerHeight;

            this.mediaInView();

            this.mediaOutView();

            this.inView();

            this.outView();

            this.magnificationMove();

            this.autoPlayVideoInView();

            break;

        }

      }
    });

    let increaseScrollSolo = new KeyboardShortcut({
      keycode: [37, 38],
      action: () => {

        switch (this.view.getActive().id) {

          case 'solo':

            this.node.grid.scrollTop = this.node.grid.scrollTop - window.innerHeight;

            this.mediaInView();

            this.mediaOutView();

            this.inView();

            this.outView();

            this.magnificationMove();

            this.autoPlayVideoInView();

            break;

        }

      }
    });

    let viewCycleTypeNext = new KeyboardShortcut({
      keycode: [81],
      action: () => {

        this.view.cycle('previous');

        this.style();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        this.magnificationHide();

        app.message.render(this.view.getActive().id.toUpperCase());

      }
    });

    let viewCycleTypePreivous = new KeyboardShortcut({
      keycode: [87],
      action: () => {

        this.view.cycle('next');

        this.style();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        this.magnificationHide();

        app.message.render(this.view.getActive().id.toUpperCase());

      }
    });

    let changeTypeSquare = new KeyboardShortcut({
      keycode: [49],
      action: () => {

        this.view.change(this.view.option[0].id);

        this.style();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        this.magnificationHide();

        app.message.render(this.view.option[0].id.toUpperCase());

      }
    });

    let changeTypeGrid = new KeyboardShortcut({
      keycode: [50],
      action: () => {

        this.view.change(this.view.option[1].id);

        this.style();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        this.magnificationHide();

        app.message.render(this.view.option[1].id.toUpperCase());

      }
    });

    let changeTypeFlex = new KeyboardShortcut({
      keycode: [51],
      action: () => {

        this.view.change(this.view.option[2].id);

        this.style();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        this.magnificationHide();

        app.message.render(this.view.option[2].id.toUpperCase());

      }
    });

    let changeTypeColumn = new KeyboardShortcut({
      keycode: [52],
      action: () => {

        this.view.change(this.view.option[3].id);

        this.style();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        this.magnificationHide();

        app.message.render(this.view.option[3].id.toUpperCase());

      }
    });

    let changeTypeSolo = new KeyboardShortcut({
      keycode: [53],
      action: () => {

        this.view.change(this.view.option[4].id);

        this.style();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        app.message.render(this.view.option[4].id.toUpperCase());

      }
    });

    let decreaseRadius = new KeyboardShortcut({
      keycode: [85],
      action: () => {

        this.radius.down();

        this.style();

        this.panReset();

        this.magnificationVideoSync();

        app.message.render(`RADIUS ${config.grid.radius.count}`);

      }
    });

    let increaseRadius = new KeyboardShortcut({
      keycode: [73],
      action: () => {

        this.radius.up();

        this.style();

        this.panReset();

        this.magnificationVideoSync();

        app.message.render(`RADIUS ${config.grid.radius.count}`);

      }
    });

    let decreaseGap = new KeyboardShortcut({
      keycode: [84],
      action: () => {

        this.gap.down();

        this.style();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        this.panReset();

        this.magnificationVideoSync();

        app.message.render(`GAP ${config.grid.gap.count}`);

      }
    });

    let increaseGap = new KeyboardShortcut({
      keycode: [89],
      action: () => {

        this.gap.up();

        this.style();

        this.mediaInView();

        this.mediaOutView();

        this.inView();

        this.outView();

        this.panReset();

        this.magnificationVideoSync();

        app.message.render(`GAP ${config.grid.gap.count}`);

      }
    });

    window.addEventListener('resize', () => {

      this.gridItemSize();

      this.gridItemMax();

      this.mediaInView();

      this.mediaOutView();

      this.inView();

      this.outView();

      this.gridItemMax();

    });

    window.addEventListener('mousemove', event => {

      if (event.altKey) {

        if (config.grid.view.solo.active) {

          switch (this.inView().type) {

            case 'mp4':

              this.magnificationVideoSync();

              break;

          }

        };

      }

    });

    window.addEventListener('scroll', event => {

      this.mediaInView();

      this.mediaOutView();

      this.inView();

      this.outView();

      if (config.media.autoPlay) {

        this.autoPlayVideoInView();

      };

    });

    this.node.grid.addEventListener('scroll', event => {

      this.mediaInView();

      this.mediaOutView();

      this.inView();

      this.outView();

      if (config.media.autoPlay) {

        this.autoPlayVideoInView();

      }

    });

  }

  this.render = () => {

    this.media.get().forEach(mediaItem => {

      let mediaItemArray = mediaItem.split(/\.(?=[^\.]+$)/);

      let mediaData = { path: mediaItemArray.shift(), type: mediaItemArray.pop(), inView: false };

      mediaData.gridItem = new GridItem(mediaData);

      mediaData.gridItem.max();

      this.node.grid.append(mediaData.gridItem.getNode());

      this.allMediaItem.push(mediaData);

    });

    this.node.grid.append(this.zoomer.getNode());

    console.log('[Grid] render', this.media.get());

  }

  this.getNode = () => this.node.grid;

  this.zoomer = new Zoomer(this);

  this.render();

  this.bind();

  this.style();

}

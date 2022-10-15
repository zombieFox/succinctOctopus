import { Image } from '../Image';
import { Video } from '../Video';
import { KeyboardShortcut } from '../KeyboardShortcut';

import { app } from '../../';
import { config } from '../../config';
import { node } from '../../utility/node';
import { applyCSSVar } from '../../utility/applyCSSVar';
import { clearChildNode } from '../../utility/clearChildNode';
import { uppercaseFirstLetter } from '../../utility/uppercaseFirstLetter';

import './index.css';

export const Zoomer = function(grid) {

  this.node = {
    zoomer: node('div|class:Zoomer')
  }

  this.magnification = {}

  this.magnification.state = {
    eventData: null,
    visible: false,
    type: [{ id: 'pinpoint', active: true }, { id: 'square', active: false }, { id: 'teardrop', active: false }],
  }

  this.magnification.move = () => {

    if (this.mediaItemInZoom && this.magnification.state.eventData) {

      if (this.mediaItemInZoom.gridItem) {

        let rect = this.mediaItemInZoom.gridItem.getNode().getBoundingClientRect();

        let gridItemWidth = this.mediaItemInZoom.gridItem.getNode().clientWidth;

        let gridItemHeight = this.mediaItemInZoom.gridItem.getNode().clientHeight;

        let mediaItemWidth = this.mediaItemInZoom.gridItem.getNode().clientWidth;

        let mediaItemHeight = this.mediaItemInZoom.gridItem.getNode().clientHeight;

        let cursorPostionX = (this.magnification.state.eventData.clientX - this.mediaItemInZoom.gridItem.getNode().offsetLeft) + app.grid.getNode().scrollLeft;

        let cursorPostionY = (this.magnification.state.eventData.clientY - this.mediaItemInZoom.gridItem.getNode().offsetTop) + app.grid.getNode().scrollTop;

        let xCenterOffset = (gridItemWidth / 2) - cursorPostionX;

        let yCenterOffset = (gridItemHeight / 2) - cursorPostionY;

        let magnification = app.grid.view.all.solo.size.count / 2;

        applyCSSVar('--Zoomer__magnification', magnification, this.node.zoomer);

        applyCSSVar('--Zoomer__mediaItemWidth', (mediaItemWidth * magnification), this.node.zoomer);

        applyCSSVar('--Zoomer__mediaItemHeight', (mediaItemHeight * magnification), this.node.zoomer);

        applyCSSVar('--Zoomer__magnificationX', (xCenterOffset * magnification), this.node.zoomer);

        applyCSSVar('--Zoomer__magnificationY', (yCenterOffset * magnification), this.node.zoomer);

      };

    };

  }

  this.magnification.toggle = () => {

    if (this.magnification.state.visible) {

      this.magnification.state.visible = false;

    } else {

      this.magnification.state.visible = true;

    }

    if (this.magnification.state.visible) {

      this.node.zoomer.classList.add('Zoomer__show');

      grid.getNode().classList.add('Grid__zoomer');

      app.message.render(`ZOOM x${app.grid.view.all.solo.size.count / 2}`);

    } else {

      this.node.zoomer.classList.remove('Zoomer__show');

      grid.getNode().classList.remove('Grid__zoomer');

    }

  }

  this.type = () => {

    this.magnification.state.type.forEach(type => {

      this.node.zoomer.classList.remove(`Zoomer__${type.id}`);

      grid.getNode().classList.remove(`Grid__zoomer${uppercaseFirstLetter(type.id)}`);

      if (type.active) {

        this.node.zoomer.classList.add(`Zoomer__${type.id}`);

        grid.getNode().classList.add(`Grid__zoomer${uppercaseFirstLetter(type.id)}`);

      }

    });

  }

  this.cycleType = () => {

    let activeIndex = 0;

    this.magnification.state.type.forEach((type, index) => {

      if (type.active) {

        activeIndex = index;

      };

      type.active = false;

    });

    activeIndex++;

    if (activeIndex > (this.magnification.state.type.length - 1)) {

      activeIndex = 0;

    };

    this.magnification.state.type[activeIndex].active = true;

  }

  this.getType = () => {

    let activeType = null;

    this.magnification.state.type.forEach(type => {

      if (type.active) {

        activeType = type;

      };

    });

    return activeType;

  }

  this.followCursor = () => {

    if (this.magnification.state.eventData) {

      let rect = this.node.zoomer.getBoundingClientRect();

      let threshold = (rect.width / 2) + config.zoom.teardrop.offset;

      let edgeTop = threshold;

      let edgeBottom = window.innerHeight - threshold;

      let edgeLeft = threshold;

      let edgeRight = window.innerWidth - threshold;

      let cursorX = this.magnification.state.eventData.clientX;

      let cursorY = this.magnification.state.eventData.clientY;

      switch (this.getType().id) {

        case 'pinpoint':
        case 'square':

          if (cursorX < edgeLeft) {
            cursorX = cursorX + (threshold - cursorX);
          }

          if (cursorX > edgeRight) {
            cursorX = cursorX - (cursorX - edgeRight);
          }

          if (cursorY < edgeTop) {
            cursorY = cursorY + (threshold - cursorY);
          }

          if (cursorY > edgeBottom) {
            cursorY = cursorY - (cursorY - edgeBottom);
          }

          break;

      }

      applyCSSVar('--Zoomer__cursorX', cursorX, this.node.zoomer);

      applyCSSVar('--Zoomer__cursorY', cursorY, this.node.zoomer);

      this.node.zoomer.classList.add('Zoomer__moving');

    }

  }

  this.viewportQuadrant = () => {

    if (this.magnification.state.eventData) {

      let cursorX = this.magnification.state.eventData.clientX;

      let cursorY = this.magnification.state.eventData.clientY;

      let rect = this.node.zoomer.getBoundingClientRect();

      let vmin = () => {
        if (window.innerWidth < window.innerHeight) {
          return window.innerWidth;
        } else {
          return window.innerHeight;
        }
      }

      let thresholdRight = window.innerWidth - (config.zoom.size * (vmin() / 100));

      let thresholdBottom = window.innerHeight - (config.zoom.size * (vmin() / 100));

      switch (this.getType().id) {

        case 'teardrop':

          thresholdBottom = thresholdBottom - config.zoom.teardrop.offset;

          thresholdRight = thresholdRight - config.zoom.teardrop.offset;

          break;

      }

      applyCSSVar('--Zoomer__viewportWidth', window.innerWidth, this.node.zoomer);

      applyCSSVar('--Zoomer__viewportHeight', window.innerHeight, this.node.zoomer);

      if (cursorX > thresholdRight) {

        this.node.zoomer.classList.add('Zoomer__quadrantRight');

      } else {

        this.node.zoomer.classList.remove('Zoomer__quadrantRight');

      }

      if (cursorY > thresholdBottom) {

        this.node.zoomer.classList.add('Zoomer__quadrantBottom');

      } else {

        this.node.zoomer.classList.remove('Zoomer__quadrantBottom');

      }

    }

  }

  this.mediaInView = () => {

    grid.allMediaItem.forEach(mediaItem => {

      let gridItemRect = mediaItem.gridItem.mediaItem.getNode().getBoundingClientRect();

      let windowSize, start, end;

      switch (config.grid.direction) {

        case 'vertical':

          windowSize = window.innerHeight;

          start = gridItemRect.top;

          end = gridItemRect.bottom;

          break;

        case 'horizontal':

          windowSize = window.innerWidth;

          start = gridItemRect.left;

          end = gridItemRect.right;

          break;

      };

      if (start >= ((windowSize * 0.2) * -1) && end <= (windowSize * 1.2)) {

        this.mediaItemInView = mediaItem;

      };

    });

  }

  this.addMediaItem = () => {

    if (this.mediaItemInView.url != this.mediaItemInZoom.url) {

      this.mediaItemInZoom = this.mediaItemInView;

      switch (this.mediaItemInZoom.type) {

        case 'video':

          this.mediaItem = new Video({ mediaData: this.mediaItemInZoom });

          break;

        case 'image':

          this.mediaItem = new Image({ mediaData: this.mediaItemInZoom });

          break;

      };

      if (this.mediaItem) {

        clearChildNode(this.node.zoomer);

        this.node.zoomer.append(this.mediaItem.getNode());

      };

    };

  }

  this.mediaItem = null;

  this.mediaItemInView = { url: '' }

  this.mediaItemInZoom = { url: '' }

  this.hide = () => {

    this.magnification.state.visible = false;

    this.node.zoomer.classList.remove('Zoomer__show');

    grid.getNode().classList.remove('Grid__zoomer');

  }

  this.playVideo = () => {

    switch (this.mediaItemInZoom.type) {

      case 'video':

        this.mediaItem.play();

        break;

    }

  }

  this.pauseVideo = () => {

    switch (this.mediaItemInZoom.type) {

      case 'video':

        this.mediaItem.pause();

        break;

    }

  }

  this.togglePlayVideo = () => {

    switch (this.mediaItemInZoom.type) {

      case 'video':

        if (this.mediaItemInZoom.gridItem.mediaItem.isPaused()) {

          this.pauseVideo();

        } else {

          this.playVideo();

        }

        break;

    }

  }

  this.syncVideo = () => {

    if (this.magnification.state.eventData) {

      switch (this.mediaItemInZoom.type) {

        case 'video':

          this.mediaItem.currentTimeSet(this.mediaItemInView.gridItem.mediaItem.currentTimeGet());

          break;

      };

    }

  }

  this.border = {}

  this.border.down = () => {

    if (config.zoom.border.count > config.zoom.border.min) {

      config.zoom.border.count = config.zoom.border.count - config.zoom.border.increment;

    }

    console.log(`[Zoomer] border size down to ${config.zoom.border.count}`);

  }

  this.border.up = () => {

    if (config.zoom.border.count < config.zoom.border.max) {

      config.zoom.border.count = config.zoom.border.count + config.zoom.border.increment;

    }

    console.log(`[Zoomer] border size up to ${config.zoom.border.count}`);

  }

  this.border.default = () => {

    config.zoom.border.count = config.zoom.border.default;

    console.log(`[Zoomer] border size set to default to ${config.zoom.border.count}`);

  }

  this.style = () => {

    applyCSSVar('--Zoomer__size', config.zoom.size, this.node.zoomer);

    applyCSSVar('--Zoomer__teardropOffset', config.zoom.teardrop.offset, this.node.zoomer);

    if (!this.magnification.state.eventData) {

      applyCSSVar('--Zoomer__cursorX', (window.innerWidth / 2), this.node.zoomer);

      applyCSSVar('--Zoomer__cursorY', (window.innerHeight / 2), this.node.zoomer);

    }

    applyCSSVar('--Zoomer__border', config.zoom.border.count, this.node.zoomer);

    if (config.zoom.border.count > 0) {

      this.node.zoomer.classList.add('Zoomer__border');

    } else {

      this.node.zoomer.classList.remove('Zoomer__border');

    }

  }

  this.bind = () => {

    window.addEventListener('mousemove', event => {

      if (app.grid.view.all.solo.active) {

        this.magnification.state.eventData = event;

        this.followCursor();

        this.mediaInView();

        this.addMediaItem();

        this.viewportQuadrant();

        this.magnification.move();

      }

    });

    let toggleZoomer = new KeyboardShortcut({
      keycode: [90],
      action: () => {

        if (app.grid.view.all.solo.active) {

          this.type();

          this.magnification.toggle();

          this.viewportQuadrant();

          this.followCursor();

          this.mediaInView();

          this.addMediaItem();

          this.magnification.move();

          this.syncVideo();

          this.togglePlayVideo();

        } else {

          this.hide();

        };

      }
    });

    let toggleType = new KeyboardShortcut({
      keycode: [88],
      action: () => {

        if (app.grid.view.all.solo.active) {

          if (!this.magnification.state.visible) {
            this.magnification.toggle();
          }

          this.cycleType();

          this.type();

          this.viewportQuadrant();

          this.followCursor();

          this.mediaInView();

          this.addMediaItem();

          this.magnification.move();

          this.syncVideo();

          this.togglePlayVideo();

          app.message.render(`ZOOM ${this.getType().id.toUpperCase()}`);

        };

      }
    });

    grid.getNode().addEventListener('scroll', event => {

      if (app.grid.view.all.solo.active) {

        this.mediaInView();

        this.addMediaItem();

        this.magnification.move();

        this.syncVideo();

        this.togglePlayVideo();

      };

    });

    let decreaseZoomBorder = new KeyboardShortcut({
      keycode: [79],
      action: () => {

        this.border.down();

        this.style();

        app.message.render(`ZOOM BORDER ${config.zoom.border.count}`);

      }
    });

    let increaseZoomBorder = new KeyboardShortcut({
      keycode: [80],
      action: () => {

        this.border.up();

        this.style();

        app.message.render(`ZOOM BORDER ${config.zoom.border.count}`);

      }
    });

  }

  this.getNode = () => this.node.zoomer;

  this.style();

  this.bind();

}

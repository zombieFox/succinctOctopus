import { Image } from '../Image';
import { Video } from '../Video';
import { Zoomer } from '../Zoomer';

import { app } from '../../';
import { config } from '../../config';
import { node } from '../../utility/node';
import { applyCSSVar } from '../../utility/applyCSSVar';
import { removeCSSVar } from '../../utility/removeCSSVar';

import './index.css';

export const GridItem = function(mediaData) {

  this.node = {
    gridItem: node('div|class:GridItem'),
    mediaItem: null,
  }

  this.orientation = (mediaOrientation) => {

    switch (mediaOrientation) {

      case 'square':
        this.node.gridItem.classList.add('GridItem__square');
        break;

      case 'landscape':
        this.node.gridItem.classList.add('GridItem__landscape');
        break;

      case 'portrait':
        this.node.gridItem.classList.add('GridItem__portrait');
        break;

    }

  }

  this.type = null;

  this.pan = {}

  this.pan.reset = () => {

    applyCSSVar('--GridItem__panX', 0, this.node.gridItem);

    applyCSSVar('--GridItem__panY', 0, this.node.gridItem);

  }

  this.pan.move = (event) => {

    let gridItemWidth = this.node.gridItem.clientWidth;

    let gridItemHeight = this.node.gridItem.clientHeight;

    let mediaItemWidth = this.node.mediaItem.node.content.clientWidth;

    let mediaItemHeight = this.node.mediaItem.node.content.clientHeight;

    let overflowX = (mediaItemWidth - gridItemWidth) / 2;

    let overflowY = (mediaItemHeight - gridItemHeight) / 2;

    let cursorPostionX = event.clientX - this.node.gridItem.offsetLeft;

    let cursorPostionY = (event.clientY + window.scrollY) - this.node.gridItem.offsetTop;

    let xCenterOffset = (gridItemWidth / 2) - cursorPostionX;

    let yCenterOffset = (gridItemHeight / 2) - cursorPostionY;

    applyCSSVar('--GridItem__panX', (overflowX / (gridItemWidth / 2)) * xCenterOffset, this.node.gridItem);

    applyCSSVar('--GridItem__panY', (overflowY / (gridItemHeight / 2)) * yCenterOffset, this.node.gridItem);

  }

  this.bind = () => {

    this.node.gridItem.addEventListener('mousemove', event => {

      if (event.shiftKey && config.grid.view.square.active) { this.pan.move(event); }

    });

    this.node.gridItem.addEventListener('click', event => {

      if (!event.metaKey && !event.shiftKey) {

        switch (app.grid.view.getActive().id) {

          case 'square':
          case 'grid':
          case 'flex':
          case 'column':

            app.grid.view.last.id = app.grid.view.getActive().id;

            app.grid.view.last.scrollY = document.documentElement.scrollTop;

            app.grid.view.change('solo');

            app.grid.style();

            this.node.gridItem.scrollIntoView();

            app.message.render(app.grid.view.option[4].id.toUpperCase());

            break;

          case 'solo':

            let scrollPosition = document.documentElement.scrollTop;

            if (app.grid.view.last.id === null || app.grid.view.last.id == 'solo') {
              app.grid.view.last.id = 'square';
            };

            app.grid.view.change(app.grid.view.last.id);

            app.grid.style();

            app.grid.magnificationHide();

            document.documentElement.scrollTop = app.grid.view.last.scrollY;

            app.grid.view.last.id = 'solo';

            app.grid.view.last.scrollY = scrollPosition;

            app.message.render(app.grid.view.getActive().id.toUpperCase());

            break;

        }

      }

    });

  }

  this.size = () => {

    let rect = this.node.gridItem.getBoundingClientRect();

    applyCSSVar('----GridItem__mediaWidth', rect.width, this.node.gridItem);

    applyCSSVar('--GridItem__mediaHeight', rect.height, this.node.gridItem);

  }

  this.render = () => {

    switch (mediaData.type) {

      case 'mp4':
      case 'webm':

        this.type = 'video';

        this.node.mediaItem = new Video({ mediaData: mediaData, scrub: true });

        break;

      case 'gif':
      case 'jpg':
      case 'jpeg':
      case 'png':

        this.type = 'image';

        this.node.mediaItem = new Image(mediaData);

        break;

    }

    this.node.gridItem.append(this.node.mediaItem.getNode());

  }

  this.getNode = () => this.node.gridItem;

  this.render();

  this.bind();

}

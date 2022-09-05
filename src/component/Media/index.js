import { config } from '../../config';

export const Media = function() {

  this.all = [];

  this.add = (r) => {

    this.all = this.all.concat(r.keys().map(r));

  }

  this.get = () => {

    if (config.media.randomOrder) {

      return this.all.sort(() => Math.random() - 0.5);

    } else {

      return this.all;

    }

  }

  this.import = () => {

    if (config.media.image) {

      this.add(require.context('../../media/image', false, /\.(png|jpe?g|svg|gif)$/));

    }

    if (config.media.video) {

      this.add(require.context('../../media/video', false, /\.(mp4)$/));

    };

  }

  this.import();

}

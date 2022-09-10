export const config = {

  media: {
    image: true,
    video: true,
    autoPlay: false,
    randomOrder: true,
  },

  grid: {
    view: {
      square: {
        active: true,
        size: { count: 4, default: 4, min: 2, max: 100, increment: 1 },
      },
      grid: {
        active: false,
        size: { count: 4, default: 4, min: 4, max: 100, increment: 1 },
      },
      flex: {
        active: false,
        size: { count: 38, default: 38, min: 6, max: 100, increment: 1 },
      },
      column: {
        active: false,
        size: { count: 36, default: 36, min: 6, max: 100, increment: 1 },
      },
      solo: {
        active: false,
        size: { count: 4, default: 4, min: 3, max: 100, increment: 1 },
      },
    },
    gap: {
      count: 4,
      default: 4,
      min: 0,
      max: 100,
      increment: 1,
    },
    radius: {
      count: 2,
      default: 2,
      min: 0,
      max: 50,
      increment: 1,
    },
  },

  zoom: {
    size: 45,
    border: { count: 3, default: 3, min: 0, max: 40, increment: 1 },
    teardrop: { offset: 10 }
  },

  theme: {
    scale: 128,
    dark: true,
    text: { h: 240, s: 10, contrast: { start: 90, end: 10 }, shades: 9 },
    primary: { h: 215, s: 25, contrast: { start: 90, end: 10 }, shades: 9 },
    accent: { h: 190, s: 80, contrast: { start: 10, end: 90 }, shades: 9 },
    font: { display: 'Poppins', ui: 'Ubuntu' },
    transition: { speed: { xfast: 10, fast: 20, medium: 30, slow: 40, xslow: 50 } },
    easing: { bounce: [0.8, 0.5, 0.2, 2] },
  },

};

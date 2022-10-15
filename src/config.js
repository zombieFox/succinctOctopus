export const config = {

  media: {
    image: true,
    video: true,
    autoPlay: true,
    randomOrder: true,
  },

  grid: {
    view: 'flex', // (square|flex|line|solo),
    direction: 'vertical', // (vertical|horizontal)
    gap: { count: 4, default: 4, min: 0, max: 100, increment: 1, },
    radius: { count: 2, default: 2, min: 0, max: 50, increment: 1, },
  },

  zoom: {
    size: 45,
    border: { count: 0, default: 0, min: 0, max: 40, increment: 1 },
    teardrop: { offset: 20 }
  },

  theme: {
    scale: 128,
    dark: true,
    text: { h: 240, s: 10, contrast: { start: 10, end: 90 }, shades: 9 },
    primary: { h: 215, s: 25, contrast: { start: 10, end: 90 }, shades: 9 },
    accent: { h: 190, s: 80, contrast: { start: 90, end: 10 }, shades: 9 },
    font: { display: 'Poppins', ui: 'Ubuntu' },
    transition: { speed: { xfast: 10, fast: 20, medium: 30, slow: 40, xslow: 50 } },
    easing: { bounce: [0.8, 0.5, 0.2, 2] },
  },

};

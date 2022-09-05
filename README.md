# Succinct Octopus

## Image and Video viewer

### [See it in action](https://zombiefox.github.io/succinctOctopus/)

[![Succinct Octopus Demo](assets/screenshot-001.gif)](https://zombiefox.github.io/succinctOctopus/)

### Customise

To make changes edit the `src/config.js` file.
Add media into the `media/image` and `media/video` directories.

### Development

To develop run:
- `npm i`
- `npm run start`

The project can be viewed locally at: `http://localhost:8080/`.

To build run:
- `npm i`
- `npm run build`

A web ready folder will be created at: `/dist/`.

### Keybaord shortcuts and controls

- `H` - Toggle help.
- `1` - Change to SQUARE gallery layout.
- `2` - Change to GRID gallery layout.
- `3` - Change to FLEX gallery layout.
- `4` - Change to COLUMN gallery layout.
- `5` - Change to SOLO gallery layout.
- `Q` or `W` - Cycle back and forth between gallery layouts.
- `T` or `Y` - Increase or decrease gallery gap.
- `U` or `I` - Increase or decrease gallery corner radius.
- `-` or `+` - Increase or decrease grid count or zoom amount in SOLO view.
- `S` - Cycle between playing and pausing all videos.
- `M` - Cycle between muting and unmuting all videos.
- `Z` - Toggle zoom only in SOLO view.
- `X` - Change zoom style in SOLO view.
- `↓` or `↑` - Jump between media in SOLO view.
- `O` or `P` - Increase or decrease zoom border.
- `D` - Cycle between light and dark mode.
- `F` - Toggle fullscreen.
- `0` - Reset all gallery layouts.

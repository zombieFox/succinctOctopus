export const applyColorRangeCSSVar = (name, colorData, node) => {

  let nodeToApplyCSSVar;

  if (node instanceof HTMLElement) {

    nodeToApplyCSSVar = node;

  } else {

    nodeToApplyCSSVar = document.querySelector('html');

  }

  let shadesIncrement = (colorData.contrast.end - colorData.contrast.start) / (colorData.shades - 1);

  for (var i = 0; i < colorData.shades; i++) {

    let hsl = [colorData.h, colorData.s, (100 - Math.round((shadesIncrement * i) + colorData.contrast.start))];

    nodeToApplyCSSVar.style.setProperty(`${name}${i + 1}H`, hsl[0]);

    nodeToApplyCSSVar.style.setProperty(`${name}${i + 1}S`, hsl[1]);

    nodeToApplyCSSVar.style.setProperty(`${name}${i + 1}L`, hsl[2]);

    nodeToApplyCSSVar.style.setProperty(`${name}${i + 1}00`, `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`);

  }

};
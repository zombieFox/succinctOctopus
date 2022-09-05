export const applyCSSVar = (name, value, node) => {

  let nodeToApplyCSSVar;

  if (node instanceof HTMLElement) {

    nodeToApplyCSSVar = node;

  } else {

    nodeToApplyCSSVar = document.querySelector('html');

  }

  nodeToApplyCSSVar.style.setProperty(name, value);

};
export const removeCSSVar = (name, node) => {

  let nodeToApplyCSSVar;

  if (node instanceof HTMLElement) {

    nodeToApplyCSSVar = node;

  } else {

    nodeToApplyCSSVar = document.querySelector('html');

  }

  nodeToApplyCSSVar.style.removeProperty(name);

};

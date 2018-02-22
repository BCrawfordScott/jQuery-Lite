const DOMNodeCollection = require('./dom_node_collection.js');

function $l(arg) {

  if(arg instanceof HTMLElement) {
    const node = [arg];
    return new DOMNodeCollection(node);
  }

  if(typeof arg === "string") {
    const nodeList = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(nodeList);
  }
}


window.$l = $l;

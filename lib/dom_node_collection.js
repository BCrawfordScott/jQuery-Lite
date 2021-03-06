class DOMNodeCollection {
  constructor(NodeList) {
    this.nodes = NodeList;
  }

  each(cb) {
    this.nodes.forEach(el => cb(el));
  }

  html(arg) {
    if ( typeof arg === "string" ) {
      this.each(el => el.innerHTML += arg);
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.each(el => $(el).html(''));
  }

  append(arg) {
    if ( typeof arg === 'string' ) {
      this.html(arg);
      return;
    }

    let toAppend;
    if (arg instanceof HTMLElement) {
      toAppend = DOMNodeCollection(arg);
    } else {
      toAppend = arg;
    }

    this.each( node => {
      toAppend.each( el => {
        node.innerHTML += el.outerHTML;
      });
    });

  }

  attr(attributeName, value) {
    if (!value) {
      return this.nodes[0].attributes[attributeName].value;
    } else {
      this.each( el => el.setAttribute(attributeName, value) );
      return value;
    }
  }

  addClass(className) {
    this.each( el => el.classList.add(className) );
  }

  removeClass(className) {
    this.each( el => el.classList.remove(className) );
  }

  children() {
    let childEls = [];
    this.each( el => {
      childEls = childEls.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(childEls);
  }

  parents() {
    let parentEls = [];
    this.each( el => {
      parentEls = parentEls.concat(Array.from(el.parent));
    });
    return new DOMNodeCollection(parentEls);
  }
}



module.exports = DOMNodeCollection;

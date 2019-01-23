﻿// Slightly modified: https://raw.githubusercontent.com/malte-wessel/react-custom-scrollbars/master/src/utils/getScrollbarWidth.js
// No "dom-css" dependancy
let scrollbarWidth = null;

export default function getScrollbarWidth() {
  if (scrollbarWidth !== null) {
    return scrollbarWidth;
  }
  /* istanbul ignore else */
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    const newStyles = {
      width: '100px',
      height: '100px',
      position: 'absolute',
      top: '-9999px',
      overflow: 'scroll',
      MsOverflowStyle: 'scrollbar'
    };

    Object.keys(newStyles).map(style => {
      div.style[style] = newStyles[style];
    });

    document.body.appendChild(div);
    scrollbarWidth = (div.offsetWidth - div.clientWidth);
    document.body.removeChild(div);
  } else {
    scrollbarWidth = 0;
  }
  return scrollbarWidth || 0;
}

export const hasNoOverlayScrollbars = getScrollbarWidth() > 0;

export const addClassIfNoOverlayScrollbar = (classname: string, htmlElement: HTMLElement = document.body) => {
  if (hasNoOverlayScrollbars) {
    htmlElement.classList.add(classname);
  }
};

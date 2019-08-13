'use strict';

let dragClientY = 0;
let dragClientX = 0;
let dragPosY = 0;
let dragPosX = 0;

let dragEvent = (svgContainer) => {
  let onDragStart = (evt) => {
    dragClientY = evt.clientY - dragPosY;
    dragClientX = evt.clientX - dragPosX;

    evt.dataTransfer.setData('Text', 'foo'); // Firefox Workaround

    // prevent ghost
    let img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    evt.dataTransfer.setDragImage(img, 0, 0);

    return false;
  };

  let onDrag = (evt) => {
    dragPosY = (evt.clientY - dragClientY); //@TODO: Firefox Issue: evt.clientY = 0
    dragPosX = (evt.clientX - dragClientX); //@TODO: Firefox Issue: evt.clientX = 0

    svgContainer.style.top = dragPosY + 'px';
    svgContainer.style.left = dragPosX + 'px';

    return false;
  };

  //@TODO: alterar cursor quando "dragstart"

  svgContainer.addEventListener('dragstart', onDragStart);
  svgContainer.addEventListener('drag', onDrag);
  svgContainer.addEventListener('dragend', onDrag);
};

let mouseWheelEvent = (element) => {
  const svgEl = element.getElementsByClassName('svg-container')[0].getElementsByTagName('svg')[0];
  let svgWidth = svgEl.clientWidth !== 0 ? svgEl.clientWidth : element.clientWidth;

  //@TODO: implementar zoom centralizado

  element.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    svgWidth = (svgWidth - evt.deltaY) > 0 ? svgWidth - evt.deltaY : svgWidth;
    svgEl.style.width = svgWidth + 'px';
  });
};

let touchEvent = (svgContainer) => {
  let onStart = (evt) => {
    evt.preventDefault();
    dragClientY = evt.changedTouches[0].clientY - dragPosY;
    dragClientX = evt.changedTouches[0].clientX - dragPosX;
  };

  let onDrag = (evt) => {
    evt.preventDefault();
    dragPosY = (evt.changedTouches[0].clientY - dragClientY);
    dragPosX = (evt.changedTouches[0].clientX - dragClientX);

    svgContainer.style.top = dragPosY + 'px';
    svgContainer.style.left = dragPosX + 'px';
  };

  svgContainer.addEventListener('touchstart', onStart);
  svgContainer.addEventListener('touchmove', onDrag);
  svgContainer.addEventListener('touchend', onDrag);
};

module.exports = (element) => {
  element.style.position = 'relative';
  element.style.overflow = 'hidden';

  let svgContainer = element.getElementsByClassName('svg-container')[0];
  svgContainer.style.position = 'absolute';
  svgContainer.style.top = '0px';
  svgContainer.style.left = '0px';
  svgContainer.style.width = '100%';
  svgContainer.style.cursor = 'grab';
  svgContainer.setAttribute('draggable', 'true');

  // DRAG EVENT
  dragEvent(svgContainer);

  // MOUSE WHEEL
  mouseWheelEvent(element);

  // TOUCH EVENT
  touchEvent(svgContainer);
};

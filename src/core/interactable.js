'use strict';

let dragEvent = (svgContainer) => {
  let dragClientY = 0;
  let dragClientX = 0;
  let dragPosY = 0;
  let dragPosX = 0;

  let onDragStart = (evt) => {
    dragClientY = evt.clientY - dragPosY;
    dragClientX = evt.clientX - dragPosX;

    // prevent ghost
    let img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    evt.dataTransfer.setDragImage(img, 0, 0);
  };

  let onDrag = (evt) => {
    dragPosY = (evt.clientY - dragClientY);
    dragPosX = (evt.clientX - dragClientX);

    svgContainer.style.top = dragPosY + 'px';
    svgContainer.style.left = dragPosX + 'px';
  };

  svgContainer.addEventListener('dragstart', onDragStart);
  svgContainer.addEventListener('drag', onDrag);
  svgContainer.addEventListener('dragend', onDrag);
};

let mouseWheel = (element) => {
  const svgEl = element.getElementsByClassName('svg-container')[0].getElementsByTagName('svg')[0];
  let svgWidth = svgEl.clientWidth;

  element.addEventListener('wheel', (evt) => {
    svgWidth = (svgWidth - evt.deltaY) > 0 ? svgWidth - evt.deltaY : svgWidth;
    svgEl.style.width = svgWidth + 'px';
  });
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
  mouseWheel(element);
};

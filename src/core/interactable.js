"use strict";

let dragClientY = 0;
let dragClientX = 0;
let dragPosY = 0;
let dragPosX = 0;

let canSvgPathClickEvents = (svgContainer, can) => {
  let svgEl = svgContainer.getElementsByTagName("svg")[0];
  let listPath = svgEl.getElementsByTagName("g")[0].getElementsByTagName("path");

  for (let i = 0; i < listPath.length; i++) {
    listPath[i].style.pointerEvents = can ? '' : 'none';
  }
};

let dragEvent = (svgContainer) => {
  let moving = false;

  let onDragStart = (evt) => {
    evt.preventDefault();
    moving = true;

    dragClientY = evt.clientY - dragPosY;
    dragClientX = evt.clientX - dragPosX;
  };

  let onDrag = (evt) => {
    evt.preventDefault();

    if(!moving){
      return;
    }

    svgContainer.style.cursor = "grab";

    canSvgPathClickEvents(svgContainer, false);

    dragPosY = (evt.clientY - dragClientY);
    dragPosX = (evt.clientX - dragClientX);

    svgContainer.style.top = dragPosY + "px";
    svgContainer.style.left = dragPosX + "px";
  };

  let onDragEnd = (evt) => {
    svgContainer.style.cursor = "pointer";
    moving = false;
    canSvgPathClickEvents(svgContainer, true);
  };

  svgContainer.addEventListener("mousedown", onDragStart);
  svgContainer.addEventListener("mousemove", onDrag);
  svgContainer.addEventListener("mouseup", onDragEnd);
  svgContainer.addEventListener("mouseleave", onDragEnd);
};

let mouseWheelEvent = (element) => {
  const svgEl = element.getElementsByClassName("svg-container")[0].getElementsByTagName("svg")[0];
  let svgWidth = svgEl.clientWidth !== 0 ? svgEl.clientWidth : element.clientWidth;

  element.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    svgWidth = (svgWidth - evt.deltaY) > 0 ? svgWidth - evt.deltaY : svgWidth;
    svgEl.style.width = svgWidth + "px";
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

    svgContainer.style.top = dragPosY + "px";
    svgContainer.style.left = dragPosX + "px";
  };

  svgContainer.addEventListener("touchstart", onStart);
  svgContainer.addEventListener("touchmove", onDrag);
  svgContainer.addEventListener("touchend", onDrag);
};

let fitSvgIntoContainer = (element) => {
  let svgContainer = element.getElementsByClassName("svg-container")[0];
  let svgEl = svgContainer.getElementsByTagName("svg")[0];

  const containerWidth = element.clientWidth;
  const containerHeight = element.clientHeight;
  let svgWidth = +svgEl.getAttribute('width');
  let svgHeight = +svgEl.getAttribute('height');

  svgContainer.style.position = "absolute";
  svgContainer.style.top = "0px";
  svgContainer.style.left = "0px";
  svgContainer.style.cursor = "pointer";
  svgContainer.setAttribute("draggable", "true");

  if(((containerWidth * svgHeight) / svgWidth) > containerHeight){
    svgWidth = (containerHeight * svgWidth) / svgHeight;
  }

  svgEl.style.width = (svgWidth >= containerWidth ? containerWidth : svgWidth) + 'px';
  svgEl.style.height = 'auto';

  // margim left
  dragPosX = ((containerWidth - svgWidth) / 2);
  svgContainer.style.left = dragPosX + 'px';
};

module.exports = (element) => {
  let svgContainer = element.getElementsByClassName("svg-container")[0];

  // RESET VARS
  dragClientY = 0;
  dragClientX = 0;
  dragPosY = 0;
  dragPosX = 0;

  // FIT
  fitSvgIntoContainer(element);

  // DRAG EVENT
  dragEvent(svgContainer);

  // MOUSE WHEEL
  mouseWheelEvent(element);

  // TOUCH EVENT
  touchEvent(svgContainer);
};

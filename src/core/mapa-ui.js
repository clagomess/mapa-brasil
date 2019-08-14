"use strict";

const constantes = require("./constantes");

module.exports = {
  closeLoader: (element) => {
    const loader = element.getElementsByClassName("loader")[0];
    const svgContainer = element.getElementsByClassName("svg-container")[0];

    loader.style.display = "none";
    svgContainer.style.display = "block";
  },

  initDom: (element) => {
    let createCssHeader = () => {
      if(document.getElementById("mapa-brasil-css")){
        return;
      }

      let style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute("id", "mapa-brasil-css");
      style.innerHTML = constantes.css;

      document.head.appendChild(style);
    };

    element.classList.add("mapa-brasil");
    element.innerHTML = '<div class="loader"></div><div class="svg-container" style="display: none"></div>';
    element.style.position = "relative";
    element.style.overflow = "hidden";

    if(!constantes.IS_NODE) {
      createCssHeader();
    }
  }
};

"use strict";

const validateOptions = require("./core/validate-options");
const constantes = require("./core/constantes");
const interactable = require("./core/interactable");
const mapaUi = require("./core/mapa-ui");
const mapaIo = require("./core/mapa-io");

if(!constantes.IS_NODE) { // not Node
  require("whatwg-fetch");
}

let draw = (element, options) => {
  options = validateOptions(options);
  mapaUi.initDom(element);

  const pathJson = mapaIo.getPath(options, false);
  const pathSvg = mapaIo.getPath(options, true);

  Promise.all([
    options.hasOwnProperty("dataFileLoader") ? options.dataFileLoader(false, pathJson) : mapaIo.loadDataFile(false, pathJson),
    options.hasOwnProperty("dataFileLoader") ? options.dataFileLoader(true, pathSvg) : mapaIo.loadDataFile(true, pathSvg),
    options.unidadeData
  ]).then(result => {
    // container
    element.getElementsByClassName("svg-container")[0].innerHTML = result[0];

    // interactable
    interactable(element);

    // SVG
    let svgEl = element.getElementsByClassName("svg-container")[0].getElementsByTagName("svg")[0];

    // paths
    let listPath = svgEl.getElementsByTagName("g")[0].getElementsByTagName("path");
    for (let i = 0; i < listPath.length; i++) {
      const codIbge = parseInt(result[1][i][constantes.codIbgeAttr[options.regiao]]);
      const nomUnidade = result[1][i][constantes.nomeUnidadeAttr[options.regiao]];

      let unidadeData = result[2].filter(item => item.codIbge == codIbge || (codIbge + "").substr(0, 6) == item.codIbge);
      unidadeData = unidadeData.length > 0 ? unidadeData[0] : {};

      listPath[i].style.fill = (unidadeData.hasOwnProperty("fillColor") ? unidadeData.fillColor : options.defaultFillColor);
      listPath[i].style.stroke = (unidadeData.hasOwnProperty("strokeColor") ? unidadeData.strokeColor : options.defaultStrokeColor);
      listPath[i].style.strokeWidth = (unidadeData.hasOwnProperty("strokeWidth") ? unidadeData.strokeWidth : 1);
      listPath[i].innerHTML = `<title>${nomUnidade}</title>`;

      if(options.hasOwnProperty("onClick")){
        listPath[i].onclick = (evt) => {
          evt.preventDefault();
          options.onClick({codIbge: codIbge, nomUnidade: nomUnidade});
        }
      }
    }

    // trigger
    if(options.hasOwnProperty("onDrawComplete")){
      options.onDrawComplete(element, result[1]);
    }

    // close-loader
    mapaUi.closeLoader(element);
  }).catch((e) => {
    console.error(e);
    mapaUi.closeLoader(element);
  });
};

module.exports = (element, options) => {
  draw(element, options);
};

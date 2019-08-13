const IS_NODE = (typeof window === 'undefined');

if(!IS_NODE) { // not Node
  require('whatwg-fetch');
}

const validateOptions = require('./core/validate-options');
const constantes = require('./core/constantes');
const interactable = require('./core/interactable');

'use strict';

let closeLoader = (element) => {
  const loader = element.getElementsByClassName('loader')[0];
  const svgContainer = element.getElementsByClassName('svg-container')[0];

  loader.style.display = 'none';
  svgContainer.style.display = 'block';
};

let createCssHeader = () => {
  if(document.getElementById('mapa-brasil-css')){
    return;
  }

  let style = document.createElement('style');
  style.setAttribute("type", "text/css");
  style.setAttribute("id", "mapa-brasil-css");
  style.innerHTML = constantes.css;

  document.head.appendChild(style);
};

let getPath = function(options, isJson) {
  let path = options.dataPath;

  if(isJson) {
    path += `/json/${constantes.mapPath[options.regiao]}/`;
  }else{
    path += `/svg/${options.qualidade}/${constantes.mapPath[options.regiao]}/`;
  }

  if(options.regiao === 'federacao'){
    path += 'br_unidades_da_federacao';
  }else {
    path += options.unidade + '_' + constantes.mapPath[options.regiao];
  }

  path += (isJson ? '.json' : '.svg');

  return path;
};

let loadDataFile = async (isJson, path) => {
  return new Promise((resolve, reject) => {
    fetch(path).then((response) => {
      return isJson ? response.json() : response.text();
    }).then((content) => {
      resolve(content);
    }).catch(e => reject(e));
  });
};

let draw = (element, options) => {
  options = validateOptions(options);

  // init DOM
  element.classList.add('mapa-brasil');
  element.innerHTML = `<div class="loader"></div><div class="svg-container" style="display: none"></div>`;

  if(!IS_NODE) {
    createCssHeader();
  }

  const pathJson = getPath(options, false);
  const pathSvg = getPath(options, true);

  Promise.all([
    options.hasOwnProperty('dataFileLoader') ? options.dataFileLoader(false, pathJson) : loadDataFile(false, pathJson),
    options.hasOwnProperty('dataFileLoader') ? options.dataFileLoader(true, pathSvg) : loadDataFile(true, pathSvg),
    options.unidadeData
  ]).then(result => {
    // container
    element.getElementsByClassName('svg-container')[0].innerHTML = result[0];

    // interactable
    interactable(element);

    // SVG
    let svgEl = element.getElementsByClassName('svg-container')[0].getElementsByTagName('svg')[0];
    svgEl.style.width = '100%';
    svgEl.style.height = 'auto';

    // paths
    let listPath = svgEl.getElementsByTagName('g')[0].getElementsByTagName('path');
    for (let i = 0; i < listPath.length; i++) {
      const codIbge = parseInt(result[1][i][constantes.codIbgeAttr[options.regiao]]);
      const nomUnidade = result[1][i][constantes.nomeUnidadeAttr[options.regiao]];

      let unidadeData = result[2].filter(item => item.codIbge === codIbge);
      unidadeData = unidadeData.length > 0 ? unidadeData[0] : {};

      listPath[i].style.fill = (unidadeData.hasOwnProperty('fillColor') ? unidadeData.fillColor : options.defaultFillColor);
      listPath[i].style.stroke = (unidadeData.hasOwnProperty('strokeColor') ? unidadeData.strokeColor : options.defaultStrokeColor);
      listPath[i].style.strokeWidth = (unidadeData.hasOwnProperty('strokeWidth') ? unidadeData.strokeWidth : 1);
      listPath[i].innerHTML = `<title>${nomUnidade}</title>`;
      listPath[i].onclick = () => {
        if(options.hasOwnProperty('onClick')){
          options.onClick({codIbge: codIbge, nomUnidade: nomUnidade})
        }
      }
    }

    // trigger
    if(options.hasOwnProperty('onDrawComplete')){
      options.onDrawComplete(element, result[1]);
    }

    // close-loader
    closeLoader(element);
  });
};

module.exports = (element, options) => {
  draw(element, options);
};

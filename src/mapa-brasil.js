require('whatwg-fetch');

'use strict';

module.exports = (element, options) => {
  draw(element, options);
};

let draw = (element, options) => {
  options = validateOptions(options);

  Promise.all([
    loadDataFile(false, '/data/svg/low/federacao/br_unidades_da_federacao.svg'),
    loadDataFile(true, 'data/json/federacao/br_unidades_da_federacao.json'),
  ]).then(result => {
    console.log(result);
    element.innerHTML = result[0];

    // SVG
    let svgEl = element.getElementsByTagName('svg')[0];
    svgEl.style.width = '100%';
    svgEl.style.height = 'auto';

    // paths
    let listPath = svgEl.getElementsByTagName('g')[0].getElementsByTagName('path');
    for (let path of listPath) {
      path.style.fill = options.defaultFillColor;
      path.style.stroke = options.defaultStrokeColor;
    }
  });
};

let validateOptions = (options) => {
  // check
  if (!options.hasOwnProperty('dataPath')) {
    options.dataPath = '/data/';
  }

  if (!options.hasOwnProperty('sigla')) {
    options.sigla = 'br';
  }

  if (!options.hasOwnProperty('regiao')) {
    options.regiao = 'federacao';
  }

  if (!options.hasOwnProperty('qualidade')) {
    options.qualidade = 'low';
  }

  if (!options.hasOwnProperty('defaultFillColor')) {
    options.defaultFillColor = '#FFF3E3';
  }

  if (!options.hasOwnProperty('defaultStrokeColor')) {
    options.defaultStrokeColor = '#1F1A17';
  }

  return options;
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
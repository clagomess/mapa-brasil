if(!(typeof window === 'undefined')) { // not Node
  require('whatwg-fetch');
}

const validateOptions = require('./core/validate-options');
const constantes = require('./core/constantes');

'use strict';

module.exports = (element, options) => {
  draw(element, options);
};

let draw = (element, options) => {
  options = validateOptions(options);

  const pathJson = getPath(options, false);
  const pathSvg = getPath(options, true);

  Promise.all([
    options.hasOwnProperty('dataFileLoader') ? options.dataFileLoader(false, pathJson) : loadDataFile(false, pathJson),
    options.hasOwnProperty('dataFileLoader')? options.dataFileLoader(true, pathSvg) : loadDataFile(true, pathSvg),
    options.unidadeData
  ]).then(result => {
    element.innerHTML = result[0];

    // SVG
    let svgEl = element.getElementsByTagName('svg')[0];
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
  });
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

require('whatwg-fetch');
const validateOptions = require('./core/validate-options');
const constantes = require('./core/constantes');

'use strict';

module.exports = (element, options) => {
  draw(element, options);
};

let draw = (element, options) => {
  options = validateOptions(options);

  Promise.all([
    loadDataFile(false, getPath(options, false)),
    loadDataFile(true, getPath(options, true)),
    options.unidadeData
  ]).then(result => {
    console.log(result);
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
      listPath[i].style.stroke = options.defaultStrokeColor;
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
  const map = {
    'mesorregiao': 'mesorregioes',
    'microregiao': 'microrregioes',
    'municipio': 'municipios',
    'federacao': 'federacao',
  };

  let path = options.dataPath;

  if(isJson) {
    path += `/json/${map[options.regiao]}/`;
  }else{
    path += `/svg/${options.qualidade}/${map[options.regiao]}/`;
  }

  if(options.regiao === 'federacao'){
    path += 'br_unidades_da_federacao';
  }else {
    path += options.unidade + '_' + map[options.regiao];
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

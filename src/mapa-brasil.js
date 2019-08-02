require('whatwg-fetch');

'use strict';

module.exports = (element, options) => {
  draw(element, options);
};

let draw = (element, options) => {
  options = validateOptions(options);

  Promise.all([
    loadDataFile(false, getPath(options, false)),
    loadDataFile(true, getPath(options, true)),
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
      listPath[i].style.fill = options.defaultFillColor;
      listPath[i].style.stroke = options.defaultStrokeColor;
      listPath[i].innerHTML = `<title>${result[1][i]['NM_ESTADO']}</title>`;
    }
  });
};

let validateOptions = (options) => {
  // check
  if (!options.hasOwnProperty('dataPath')) {
    options.dataPath = '/data';
  }

  if (!options.hasOwnProperty('unidade')) { //@TODO: quando for number, converter para sigla
    options.unidade = 'br';
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

let getPath = function(options, isJson) {
  const map = {
    'mesorregiao': 'mesorregioes',
    'microregiao': 'microrregioes',
    'municipio': 'municipios',
  };

  let path = options.dataPath;

  if(isJson) {
    path += '/json/' + options.regiao + '/';
  }else{
    path += '/svg/' + options.qualidade + '/' + options.regiao + '/';
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

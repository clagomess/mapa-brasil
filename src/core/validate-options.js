'use strict';

module.exports = (options) => {
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

  if (!options.hasOwnProperty('unidadeData')) {
    options.unidadeData = new Promise((resolve => {
      resolve([]);
    }));
  }else{
    if(options.unidadeData instanceof Array){
      options.unidadeData = new Promise((resolve => {
        resolve(options.unidadeData);
      }))
    }
  }

  return options;
};

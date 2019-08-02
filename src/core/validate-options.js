const constantes = require('./constantes');

'use strict';

/**
 * @param options
 * @return {{
 *     onClick: function
 * }}
 */
module.exports = (options) => {
  // check
  if (!options.hasOwnProperty('dataPath')) {
    options.dataPath = '/data';
  }

  if (!options.hasOwnProperty('unidade')) { //@TODO: quando for number, converter para sigla
    options.unidade = 'br';
  }else{
    options.unidade = validateUnidade(options.unidade);
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

// ### VALIDATE

// unidade
let validateUnidade = (unidade) =>{
  if(Number.isInteger(unidade)){
    unidade = constantes.codIbgeEstadoToSigla[unidade];
  }

  return unidade;
};

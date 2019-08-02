require('whatwg-fetch');

'use strict';

module.exports = async (element, options) => {
  console.log("Disgraça");

  let data = await loadDataFile(options);

  console.log(data);
};

/*export default class {
  /*draw = async (element, options) => {
    // check
    if (!options.hasOwnProperty('dataPath')) {
      options.dataPath = 'data';
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

    let data = await loadDataFile(options);

    console.log(data);
  };

  draw = () => {
    console.log("uqlele");
  }
}
*/

let loadDataFile = async (options) => {
  //@TODO: implements options
  fetch('/data/svg/low/federacao/br_unidades_da_federacao.svg').then((response) => {
    console.log(response);
    return response.text();
  }).then((content) => {
    console.log(content);
  });
};
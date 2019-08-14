"use strict";

const constantes = require("./constantes");

module.exports = {
  getPath: (options, isJson) => {
    let path = options.dataPath;

    if(isJson) {
      path += `/json/${constantes.mapPath[options.regiao]}/`;
    }else{
      path += `/svg/${options.qualidade}/${constantes.mapPath[options.regiao]}/`;
    }

    if(options.regiao === "federacao"){
      path += "br_unidades_da_federacao";
    }else {
      path += options.unidade + "_" + constantes.mapPath[options.regiao];
    }

    path += (isJson ? ".json" : ".svg");

    return path;
  },

  loadDataFile: (isJson, path) => {
    return new Promise((resolve, reject) => {
      fetch(path).then((response) => {
        return isJson ? response.json() : response.text();
      }).then((content) => {
        resolve(content);
      }).catch((e) => reject(e));
    });
  }
};

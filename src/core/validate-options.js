"use strict";

const constantes = require("./constantes");

// unidade
let validateUnidade = (unidade) => {
  if((typeof unidade) != "number" && (typeof unidade) != "string"){
    throw new Error("options.unidade: esperado {number} ou {string}");
  }

  if(Number.isInteger(unidade)){
    unidade = constantes.codIbgeEstadoToSigla[unidade];
  }else{
    unidade = unidade.toLowerCase();
  }

  if(!unidade || constantes.listUfSigla.indexOf(unidade) === -1){
    throw new Error(`options.unidade: "${unidade}" => valor invalido`);
  }

  return unidade;
};

// regiao
let validateRegiao = (regiao) => {
  if((typeof regiao) != "string"){
    throw new Error("options.regiao: esperado {string}");
  }

  if(!constantes.mapPath[regiao]){
    throw new Error(`options.regiao: "${regiao}" => valor invalido`);
  }

  return regiao;
};

// qualidade
let validateQualidade = (qualidade) => {
  if((typeof qualidade) != "string"){
    throw new Error("options.qualidade: esperado {string}");
  }

  if(qualidade !== "low"){
    throw new Error(`options.qualidade: "${qualidade}" => valor invalido`);
  }

  return qualidade;
};

// unidadeData
let validateUnidadeData = (unidadeData) => {
  if(!(unidadeData instanceof Array) && !(unidadeData instanceof Promise)){
    throw new Error("options.unidadeData: esperado {Array} ou {Promise}");
  }
};

module.exports = (options) => {
  // check
  if (!options.hasOwnProperty("dataPath")) {
    options.dataPath = "/data";
  }

  if (!options.hasOwnProperty("unidade")) {
    options.unidade = "br";
  }else{
    options.unidade = validateUnidade(options.unidade);
  }

  if (!options.hasOwnProperty("regiao")) {
    options.regiao = "federacao";
  }else{
    options.regiao = validateRegiao(options.regiao);
  }

  if (!options.hasOwnProperty("qualidade")) {
    options.qualidade = "low";
  }else{
    options.qualidade = validateQualidade(options.qualidade);
  }

  if (!options.hasOwnProperty("defaultFillColor")) {
    options.defaultFillColor = "#FFF3E3";
  }

  if (!options.hasOwnProperty("defaultStrokeColor")) {
    options.defaultStrokeColor = "#1F1A17";
  }

  if (!options.hasOwnProperty("unidadeData")) {
    options.unidadeData = new Promise((resolve => {
      resolve([]);
    }));
  }else{
    validateUnidadeData(options.unidadeData);

    if(options.unidadeData instanceof Array){
      options.unidadeData = new Promise((resolve => {
        resolve(options.unidadeData);
      }));
    }
  }

  return options;
};

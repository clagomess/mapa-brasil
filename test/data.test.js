"use strict";

const assert = require('assert');
const fs = require('fs');
const xmlJs = require('xml-js');
const constantes = require('../src/core/constantes');

describe('JsonEstrutura', () => {
  it('mesorregiao', () => {
    constantes.listUfSigla.forEach((sgl) => {
      let filename = sgl === 'br' ? 'br_mesorregioes.json' : sgl + '_mesorregioes.json';
      let json = JSON.parse(fs.readFileSync('data/json/mesorregioes/' + filename).toString());

      assert.ok(json.length);

      json.forEach(item => {
        assert.ok(item.hasOwnProperty("NM_MESO"));
        assert.ok(item.hasOwnProperty("CD_GEOCME"));
      });
    });
  });

  it('microrregiao', () => {
    constantes.listUfSigla.forEach((sgl) => {
      let filename = sgl === 'br' ? 'br_microrregioes.json' : sgl + '_microrregioes.json';
      let json = JSON.parse(fs.readFileSync('data/json/microrregioes/' + filename).toString());

      assert.ok(json.length);

      json.forEach(item => {
        assert.ok(item.hasOwnProperty("NM_MICRO"));
        assert.ok(item.hasOwnProperty("CD_GEOCMI"));
      });
    });
  });

  it('municipio', () => {
    constantes.listUfSigla.forEach((sgl) => {
      let filename = sgl === 'br' ? 'br_municipios.json' : sgl + '_municipios.json';
      let json = JSON.parse(fs.readFileSync('data/json/municipios/' + filename).toString());

      assert.ok(json.length);

      json.forEach(item => {
        assert.ok(item.hasOwnProperty("NM_MUNICIP"));
        assert.ok(item.hasOwnProperty("CD_GEOCMU"));
      });
    });
  });

  it('unidadeFederacao', () => {
    let filename = 'br_unidades_da_federacao.json';
    let json = JSON.parse(fs.readFileSync('data/json/federacao/' + filename).toString());

    assert.ok(json.length);

    json.forEach(item => {
      assert.ok(item.hasOwnProperty("NM_ESTADO"));
      assert.ok(item.hasOwnProperty("NM_REGIAO"));
      assert.ok(item.hasOwnProperty("CD_GEOCUF"));
    });
  });
});

describe('SvgEstrutura', () => {
  let fnCompare = (filename) => {
    // SVG
    let svgRaw = fs.readFileSync('data/svg/low/' + filename + '.svg').toString();
    let svgJson = JSON.parse(xmlJs.xml2json(svgRaw, {compact: true, spaces: 2}));

    // JSON
    let json = JSON.parse(fs.readFileSync('data/json/' + filename + '.json').toString());

    // COMPARE
    let path = svgJson['svg']['g']['path'];
    assert.strictEqual(path instanceof Array ? path.length : 1, json.length);
  };

  it('mesorregiao', () => {
    constantes.listUfSigla.forEach((sgl) => {
      fnCompare('mesorregioes/' + sgl + '_mesorregioes');
    });
  });

  it('microrregiao', () => {
    constantes.listUfSigla.forEach((sgl) => {
      fnCompare('microrregioes/' + sgl + '_microrregioes');
    });
  });

  it('municipio', () => {
    constantes.listUfSigla.forEach((sgl) => {
      fnCompare('municipios/' + sgl + '_municipios');
    });
  });

  it('unidadeFederacao', () => {
    let filename = 'federacao/br_unidades_da_federacao';
    fnCompare(filename);
  });
});

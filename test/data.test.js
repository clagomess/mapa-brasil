"use strict";

const assert = require('assert');
const fs = require('fs');
const xmlJs = require('xml-js');

const listUf = [
  'ac', 'al', 'am', 'ap',
  'ba', 'ce', 'df', 'es',
  'go', 'ma', 'mg', 'ms',
  'mt', 'pa', 'pb', 'pe',
  'pi', 'pr', 'rj', 'rn',
  'ro', 'rr', 'rs', 'sc',
  'se', 'sp', 'to', 'br',
];

describe('JsonEstrutura', () => {
  it('mesorregiao', () => {
    listUf.forEach((sgl) => {
      let filename = sgl === 'br' ? 'br_mesorregioes.json' : sgl + '_mesorregioes.json';

      console.log(`Testando: ${filename}`);

      let json = JSON.parse(fs.readFileSync('data/' + filename).toString());

      assert.ok(json.length);

      json.forEach(item => {
        assert.ok(item.hasOwnProperty("NM_MESO"));
        assert.ok(item.hasOwnProperty("CD_GEOCME"));
      });
    });
  });

  it('microrregiao', () => {
    listUf.forEach((sgl) => {
      let filename = sgl === 'br' ? 'br_microrregioes.json' : sgl + '_microrregioes.json';

      console.log(`Testando: ${filename}`);

      let json = JSON.parse(fs.readFileSync('data/' + filename).toString());

      assert.ok(json.length);

      json.forEach(item => {
        assert.ok(item.hasOwnProperty("NM_MICRO"));
        assert.ok(item.hasOwnProperty("CD_GEOCMI"));
      });
    });
  });

  it('municipio', () => {
    listUf.forEach((sgl) => {
      let filename = sgl === 'br' ? 'br_municipios.json' : sgl + '_municipios.json';

      console.log(`Testando: ${filename}`);

      let json = JSON.parse(fs.readFileSync('data/' + filename).toString());

      assert.ok(json.length);

      json.forEach(item => {
        assert.ok(item.hasOwnProperty("NM_MUNICIP"));
        assert.ok(item.hasOwnProperty("CD_GEOCMU"));
      });
    });
  });
});

describe('SvgEstrutura', () => {
  let fnCompare = (filename) => {
    console.log(`Testando: ${filename}.svg`);

    // SVG
    let svgRaw = fs.readFileSync('data/' + filename + '.svg').toString();
    let svgJson = JSON.parse(xmlJs.xml2json(svgRaw, {compact: true, spaces: 2}));

    // JSON
    let json = JSON.parse(fs.readFileSync('data/' + filename + '.json').toString());

    // COMPARE
    let path = svgJson['svg']['g']['path'];
    assert.strictEqual(path instanceof Array ? path.length : 1, json.length);
  };

  it('mesorregiao', () => {
    listUf.forEach((sgl) => {
      let filename = sgl === 'br' ? 'br_mesorregioes' : sgl + '_mesorregioes';
      fnCompare(filename);
    });
  });

  it('microrregiao', () => {
    listUf.forEach((sgl) => {
      let filename = sgl === 'br' ? 'br_microrregioes' : sgl + '_microrregioes';
      fnCompare(filename);
    });
  });

  it('municipio', () => {
    listUf.forEach((sgl) => {
      let filename = sgl === 'br' ? 'br_municipios' : sgl + '_municipios';
      fnCompare(filename);
    });
  });
});
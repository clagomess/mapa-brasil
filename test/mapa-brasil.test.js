"use strict";

const assert = require('assert');
const jsdom = require("jsdom");
const mapaBrasil = require('../src/mapa-brasil');

const { JSDOM } = jsdom;
const dom = new JSDOM(`<body><div id="mapa"></div></body>`);

describe('MapaBrasil', () => {
  it('draw', () => {

    mapaBrasil(dom.window.document.getElementById('mapa'), {
      dataFileLoader: (isJson, path) => {
        return "";
      }
    })
  });
});

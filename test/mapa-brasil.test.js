"use strict";

const fs = require('fs');
const assert = require('assert');
const jsdom = require("jsdom");
const mapaBrasil = require('../src/mapa-brasil');

const { JSDOM } = jsdom;
const dom = new JSDOM(`<body><div id="mapa"></div></body>`);

describe('MapaBrasil', () => {
  it('draw', () => {

    mapaBrasil(dom.window.document.getElementById('mapa'), {
      dataPath: '../data',
      dataFileLoader: (isJson, path) => {
        return new Promise((resolve, reject) => {
          const content = fs.readFileSync(path).toString();
          resolve(isJson ? JSON.stringify(content) : content);
        });
      }
    })
  });
});

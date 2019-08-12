"use strict";

const fs = require('fs');
const assert = require('assert');
const path = require('path');
const jsdom = require("jsdom");
const mapaBrasil = require('../src/mapa-brasil');

const { JSDOM } = jsdom;
const dom = new JSDOM(`<body><div id="mapa"></div></body>`);

describe('MapaBrasil', () => {
  it('draw', () => {
    mapaBrasil(dom.window.document.getElementById('mapa'), {
      dataPath: path.resolve(__dirname, '../data'),
      dataFileLoader: (isJson, path) => {
        return new Promise((resolve, reject) => {
          const content = fs.readFileSync(path).toString();
          resolve(isJson ? JSON.stringify(content) : content);
        });
      },
      onDrawComplete: (el, data) => {
        assert.ok(data.length > 0);
        assert.ok(el.innerHTML.length > 0);
      }
    });
  });
});

"use strict";

const validateOptions = require('../src/core/validate-options');
const assert = require('assert');

describe('ValidateOptions', () => {
  const listThrowsObjects = [1234, 'ceilandia', [], null, undefined];

  it('validateUnidade', () => {
    assert.strictEqual(validateOptions({}).unidade, 'br');
    assert.strictEqual(validateOptions({unidade: 'df'}).unidade, 'df');
    assert.strictEqual(validateOptions({unidade: 31}).unidade, 'mg');
    assert.strictEqual(validateOptions({unidade: 'BA'}).unidade, 'ba');

    listThrowsObjects.forEach(item => {
      assert.throws(() => validateOptions({unidade: item}).unidade);
    });
  });

  it('validateRegiao', () => {
    assert.strictEqual(validateOptions({}).regiao, 'federacao');
    assert.strictEqual(validateOptions({regiao: 'municipio'}).regiao, 'municipio');

    listThrowsObjects.forEach(item => {
      assert.throws(() => validateOptions({regiao: item}).unidade);
    });
  });

});

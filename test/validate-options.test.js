"use strict";

const validateOptions = require('../src/core/validate-options');
const assert = require('assert');

describe('ValidateOptions', () => {
  const listThrowsObjects = [1234, 'ceilandia', [], null, undefined, new Promise((resolve) => resolve(true))];
  const listThrowsObjectsB = [1234, 'ceilandia', null, undefined];

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

  it('validateQualidade', () => {
    assert.strictEqual(validateOptions({}).qualidade, 'low');
    assert.strictEqual(validateOptions({qualidade: 'low'}).qualidade, 'low');

    listThrowsObjects.forEach(item => {
      assert.throws(() => validateOptions({qualidade: item}).qualidade);
    });
  });

  it('validateUnidadeData', () => {
    assert.ok(validateOptions({}).unidadeData instanceof Promise);
    assert.ok(validateOptions({unidadeData: []}).unidadeData instanceof Promise);
    assert.ok(validateOptions({unidadeData: new Promise(() => null)}).unidadeData instanceof Promise);

    listThrowsObjectsB.forEach(item => {
      assert.throws(() => validateOptions({unidadeData: item}).unidadeData);
    });
  });

});

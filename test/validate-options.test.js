"use strict";

const validateOptions = require('../src/core/validate-options');
const assert = require('assert');

describe('ValidateOptions', () => {
  it('validateUnidade', () => {
    assert.strictEqual(validateOptions({}).unidade, 'br');
    assert.strictEqual(validateOptions({unidade: 'df'}).unidade, 'df');
    assert.strictEqual(validateOptions({unidade: 31}).unidade, 'mg');
    assert.strictEqual(validateOptions({unidade: 'BA'}).unidade, 'ba');
    assert.throws(() => validateOptions({unidade: 99}).unidade);
    assert.throws(() => validateOptions({unidade: 'tocantins'}).unidade);
    assert.throws(() => validateOptions({unidade: []}).unidade);
  });


});

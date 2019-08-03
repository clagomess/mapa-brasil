'use strict';

module.exports = {
  listUfSigla: [
    'br',
    'ac', 'al', 'am', 'ap',
    'ba', 'ce', 'df', 'es',
    'go', 'ma', 'mg', 'ms',
    'mt', 'pa', 'pb', 'pe',
    'pi', 'pr', 'rj', 'rn',
    'ro', 'rr', 'rs', 'sc',
    'se', 'sp', 'to'
  ],

  codIbgeEstadoToSigla: {
    12:	'ac', 13:	'am', 14:	'rr', 11:	'ro',
    15:	'pa', 16:	'ap', 17:	'to', 21:	'ma',
    22:	'pi', 23:	'ce', 24:	'rn', 25:	'pb',
    26:	'pe', 27:	'al', 28:	'se', 29:	'ba',
    31:	'mg', 32:	'es', 33:	'rj', 35:	'sp',
    41:	'pr', 42:	'sc', 43:	'rs', 50:	'ms',
    51:	'mt', 52:	'go', 53:	'df',
  },

  codIbgeAttr: {
    'federacao': 'CD_GEOCUF',
    'mesorregiao': 'CD_GEOCME',
    'microrregiao': 'CD_GEOCMI',
    'municipio': 'CD_GEOCMU',
  },

  nomeUnidadeAttr: {
    'federacao': 'NM_ESTADO',
    'mesorregiao': 'NM_MESO',
    'microrregiao': 'NM_MICRO',
    'municipio': 'NM_MUNICIP',
  },

  mapPath: {
    'mesorregiao': 'mesorregioes',
    'microrregiao': 'microrregioes',
    'municipio': 'municipios',
    'federacao': 'federacao',
  }
};
